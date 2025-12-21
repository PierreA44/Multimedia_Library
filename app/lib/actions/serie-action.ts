"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const SerieFormSchema = z.object({
    id: z.string(), 
    title: z.string(),
    startYear: z.coerce.number(), 
    endYear: z.coerce.number().nullable(), 
    numberOfSeasons: z.coerce.number(),
});

export type SerieState = {
    errors? :{
        title?: string[];
        startYear?: string[];
        endYear?: string[];
        numberOfSeasons?: string[];
    };
    message?: string | null;
};

const CreateSerie = SerieFormSchema.omit({id:true});

export async function createSerie (formData: FormData): Promise<void | SerieState> {
    const validateFields = CreateSerie.safeParse({
        title: formData.get("title"),
        startYear: formData.get("startYear"),
        endYear: formData.get("endYear"),
        numberOfSeasons: formData.get("numberOfSeasons"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create book."
        };
    };

    const {title, startYear, endYear, numberOfSeasons} = validateFields.data;
    try {
        await sql`
            INSERT INTO books (id, title, startYear, endYear, numberOfSeasons, date)
            VALUES ("c10", ${title}, ${startYear}, ${endYear}, ${numberOfSeasons}, CURRENT_TIMESTAMP);`;        

    } catch(error) {
        console.error(error);
        return {
            message: "Database error: Failed to create book."
        }
    };

    revalidatePath("dashboard/books");
}