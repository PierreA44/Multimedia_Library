"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const MovieFormSchema = z.object({
    id: z.string(),
    title: z.string(),
    director: z.string(),
    year: z.number(),
    duration: z.number().nullable(),
});

const CreateMovie = MovieFormSchema.omit({id: true});
