"use server";

import  {z} from "zod";
import postgres, { Row, RowList } from "postgres";
import { refresh, revalidatePath } from "next/cache";
import { Serie } from "../definitions";
import { Session } from "next-auth";
import { auth } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const year: number = new Date().getFullYear();

const SerieFormSchema = z.object({
    id: z.string(), 
    title: z.string().min(3,  "Le titre doit contenir au moins 3 caractères"),
    start_year: z.coerce.number().gte(1900, "l'année doit être supérieur à 1900").lte(year, `L'année ne pas pas dépasser ${year}`), 
    end_year: z.preprocess(
    (val) => val === "" || val === undefined ? null : Number(val),
    z.number()
      .gte(1900, "L'année doit être supérieure à 1900")
      .lte(year, `L'année ne peut pas dépasser ${year}`)
      .nullable()
  ),
    seasons: z.coerce.number().gte(1, "le nombre de saison doit être au moins 1"),
});

export type SerieState = {
    errors? :{
        title?: string[];
        start_year?: string[];
        end_year?: string[];
        seasons?: string[];
    };
    message?: string | null;
    fields?:{
        title?: string;
        start_year?: string;
        end_year?: string | null;
        seasons?: string;
    };
    redirectTo? : string | null;
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
            message: "Missing fields. Failed to create serie.",
            fields: {
                title: formData.get("title")?.toString() ?? "",
                start_year: formData.get("start_year")?.toString() ?? "",
                end_year: formData.get("end_year")?.toString() ?? "",
                seasons: formData.get("seasons")?.toString() ?? "",
                }
        };
    };

    const {title, start_year, end_year, seasons} = validateFields.data;

    if( end_year && end_year < start_year) {
        return {
            errors: { "end_year" : ["l'année de fin doit être supérieur à l'année de début."]},
            fields: {
            title,
            start_year: start_year.toString(),
            end_year: end_year.toString(),
            seasons: seasons.toString(),
            }
        }
    };
    

    const normalizedTitle: string = title.toLocaleLowerCase();


    const session: Session | null = await auth()

    try {
        const [result] = await sql`SELECT id FROM medias WHERE title=${normalizedTitle} AND category='serie';`;
        
        if(result) {
            return {message: "Serie already created",
                    fields: {
                            title,
                            start_year: start_year.toString(),
                            end_year: end_year?.toString(),
                            seasons: seasons.toString(),
                            }
                    };
        };

        if(session?.user?.email) {
            const newSerie: RowList<Row[]> = await sql`
            INSERT INTO medias (title, category, start_year, end_year, seasons)
            VALUES (${normalizedTitle}, 'serie', ${start_year}, ${end_year}, ${seasons})
            RETURNING id;`;

            const userId: RowList<Row[]> = await sql`SELECT id FROM users WHERE email=${session.user.email}`;

            if(userId.length === 0) {
                return {message: "User not found"};
            };

            await sql`INSERT INTO libraries (user_id, media_id) VALUES (${userId[0].id}, ${newSerie[0].id})`;

            revalidatePath("dashboard/add-media");
            refresh();

            return {message: "Serie created succesfully.",
                    redirectTo: `/dashboard/series/${newSerie[0].id}`
            };
        } else return {message: "User not found"};

    } catch(error) {
        console.error(error);
        return {
            message: "Database error: Failed to create serie.",
            fields: {
            title,
            start_year: start_year.toString(),
            end_year: end_year?.toString(),
            seasons: seasons.toString(),
                }
            };
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

        const series: Serie[] = await sql`SELECT m.id, m.title, m.category, l.id AS librarie_id FROM libraries l
                                            INNER JOIN medias m on l.media_id = m.id
                                            WHERE l.user_id=${userId[0].id} AND m.category = 'serie';`;

        return series;
        
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function fetchSerieById(id:string): Promise<Serie> {

    const session = await auth();
    const email = session?.user?.email;

    const emptySerie: Serie = {
        id: 0,
        title: 'no serie',
        start_year: 1,
        end_year: null,
        seasons: 0,
        category: "serie",
        librarie_id: 0,
        notation: 0,
        comment: ""
    }

    try {
        if(email) {
            const result: Serie[] = await sql`SELECT
                    m.id, m.title, m.seasons, m.start_year, m.end_year,
                    l.notation, l.comment, l.id AS librarie_id, 'serie' AS category
                    FROM medias AS m
                    JOIN libraries AS l ON l.media_id = m.id
                    JOIN users AS u ON u.id = l.user_id
                    WHERE m.id = ${id} AND u.email = ${email}`;

            return result[0] ?? emptySerie;
        };

        // Sans utilisateur connecté
        const result: Serie[] = await sql`SELECT
                    m.id, m.title, m.seasons, m.start_year, m.end_year,
                    0 AS notation, '' AS comment, 0 AS librarie_id, 'serie' AS category
                    FROM medias AS m
                    WHERE m.id = ${id}`;

        return result[0] ?? emptySerie;
        
    } catch (error) {
        console.error(error);
        return emptySerie;
    };
};