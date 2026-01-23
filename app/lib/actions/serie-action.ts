"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { Serie } from "../definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const SerieFormSchema = z.object({
    id: z.string(), 
    title: z.string(),
    start_year: z.coerce.number(), 
    end_year: z.coerce.number().nullable(), 
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

export async function createSerie (formData: FormData): Promise<void | SerieState> {
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

    const {title, start_year, end_year, seasons} = validateFields.data;
    try {
        await sql`
            INSERT INTO series (title, start_year, end_year, seasons)
            VALUES (${title}, ${start_year}, ${end_year}, ${seasons});`;
            
            revalidatePath("dashboard/series");
        return {
            message: `Serie "${title}" created succesfully.`
        }

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

export async function fetchSerieById(id:string): Promise<Serie | null> {

    try {
        const serie: Serie[] = await sql`SELECT id, title, start_year, end_year, seasons FROM medias WHERE id=${id};`;

        return serie[0];
        
    } catch (error) {
        console.error(error);
        return null;
    };
};