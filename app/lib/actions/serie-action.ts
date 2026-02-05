"use server";

import  {z} from "zod";
import postgres, { Row, RowList } from "postgres";
import { refresh, revalidatePath } from "next/cache";
import { Serie } from "../definitions";
import { Session } from "next-auth";
import { auth } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const SerieFormSchema = z.object({
    id: z.string(), 
    title: z.string(),
    startYear: z.coerce.number(), 
    endYear: z.coerce.number().nullable(), 
    seasons: z.coerce.number(),
});

export type SerieState = {
    errors? :{
        title?: string[];
        start_year?: string[];
        end_year?: string[];
        seasons?: string[];
    };
    message?: string | null;
};

const CreateSerie = SerieFormSchema.omit({id:true});

export async function createSerie (prevState: SerieState, formData: FormData): Promise<SerieState> {
    const validateFields = CreateSerie.safeParse({
        title: formData.get("title"),
        start_year: formData.get("start_year"),
        end_year: formData.get("end_year"),
        seasons: formData.get("seasons"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create book."
        };
    };

    const {title, startYear, endYear, seasons} = validateFields.data;
    const normalizedTitle: string = title.toLocaleLowerCase();


    const session: Session | null = await auth()

    try {
        const [result] = await sql`SELECT id FROM medias WHERE title=${normalizedTitle} AND category='serie';`;
        
        if(result) {
            return {message: "Serie already created"};
        };

        if(session?.user?.email) {
            const newSerie: RowList<Row[]> = await sql`
            INSERT INTO medias (title, category, start_year, end_year, seasons)
            VALUES (${normalizedTitle}, serie, ${startYear}, ${endYear}, ${seasons})
            RETURNING id;`;

            const userId: RowList<Row[]> = await sql`SELECT id FROM users WHERE email=${session.user.email}`;

            if(userId.length === 0) {
                return {message: "User not found"};
            };

            await sql`INSERT INTO libraries (user_id, media_id) VALUES (${userId[0].id}, ${newSerie[0].id})`;

            revalidatePath("dashboard/add-media");
            refresh();

            return {message: "Serie created succesfully."};
        } else return {message: "User not found"};

    } catch(error) {
        console.error(error);
        return {
            message: "Database error: Failed to create serie."
        }
    };
};

export async function fetchSeries(): Promise<Serie[] | null> {

    try {
        const series: Serie[] = await sql`SELECT id, title, start_year, end_year, seasons FROM medias WHERE category='serie'`;

        return series;

    } catch (error) {
        console.error(error);
        return null;
    };
};

export async function fetchUserSeries(email: string): Promise<Serie[] | null> {

    try {
        const userId = await sql`SELECT id FROM users WHERE email=${email}`;

        const series: Serie[] = await sql`SELECT medias.id, medias.title FROM libraries
                                            INNER JOIN medias on libraries.media_id = medias.id
                                            WHERE libraries.user_id=${userId[0].id} AND medias.category = 'serie';`;

        return series;
        
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function fetchSerieById(id:string): Promise<Serie | null> {

    const emptySerie: Serie = {
        id: '0',
        title: 'no serie',
        start_year: 1,
        end_year: null,
        seasons: 0
    }

    try {
        const serie: Serie[] = await sql`SELECT id, title, start_year, end_year, seasons FROM medias WHERE id=${id};`;

        if(serie[0]) {
            return serie[0];
        } else return emptySerie;
        
    } catch (error) {
        console.error(error);
        return emptySerie;
    };
};