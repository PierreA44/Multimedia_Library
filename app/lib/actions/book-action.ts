"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { timeStamp } from "console";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const BookFormSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    originalPublishing: z.coerce.number().gt(1500, {message: "Please enter a year greater than 1500"}),
    genre: z.literal(["roman", "nouvelle", "conte", "biographie", "théâtre", "poésie", "essai"]),
});

export type BookState = {
    errors? :{
        title?: string[];
        author?: string[];
        originalPublishing?: string[];
        genre?: string[];
    };
    message?: string | null;
};

const CreateBook = BookFormSchema.omit({id:true});

export async function createBook (prevState: BookState, formData: FormData): Promise<BookState> {
    const validateFields = CreateBook.safeParse({
        title: formData.get("title"),
        author: formData.get("author"),
        originalPublishing: formData.get("originalPublishing"),
        genre: formData.get("genre"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create book."
        };
    };

    const {title, author, originalPublishing, genre} = validateFields.data;
    try {
        await sql`
            INSERT INTO books (id, title, author, originalPublishing, genre, date)
            VALUES ('c10', ${title}, ${author}, ${originalPublishing}, ${genre}, CURRENT_TIMESTAMP);`;

            revalidatePath("dashboard/books");
        return {
            message: "Book created succesfully ."
        }        

    } catch(error) {
        console.error(error);
        return {
            message: "Database error: Failed to create book."
        }
    };
}

