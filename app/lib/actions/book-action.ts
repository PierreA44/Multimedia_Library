"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { Book } from "../definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const BookFormSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    original_publishing: z.coerce.number().gt(1500, {message: "Please enter a year greater than 1500"}),
    genre: z.literal(["roman", "nouvelle", "conte", "biographie", "théâtre", "poésie", "essai"]),
});

export type BookState = {
    errors? :{
        title?: string[];
        author?: string[];
        original_publishing?: string[];
        genre?: string[];
    };
    message?: string | null;
};

const CreateBook = BookFormSchema.omit({id:true});

export async function createBook (prevState: BookState, formData: FormData): Promise<BookState> {
    const validateFields = CreateBook.safeParse({
        title: formData.get("title"),
        author: formData.get("author"),
        original_publishing: formData.get("original_publishing"),
        genre: formData.get("genre"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create book."
        };
    };

    const {title, author, original_publishing, genre} = validateFields.data;
    try {
        await sql`
            INSERT INTO books (title, category, author, original_publishing, genre)
            VALUES (${title}, 'book', ${author}, ${original_publishing}, ${genre});`;

            revalidatePath("dashboard/books");
        return {
            message: "Book created succesfully."
        }        

    } catch(error) {
        console.error(error);
        return {
            message: "Database error: Failed to create book."
        };
    };
};

export async function fetchBook(): Promise<Book[] | null > {
    try {
        const books: Book[] = await sql`SELECT id, title, author, original_publishing, genre FROM medias WHERE category='book'`;

        return books;
        
    } catch (error) {
        console.error(error);
        return null
    };
};

export async function fetchBookById(id:string): Promise<Book | null > {
    try {
        const book: Book[] = await sql`SELECT id, title, author, original_publishing, genre FROM medias WHERE id=${id}`;

        return book[0];

    } catch (error) {
        console.error(error);
        return null;
    };
};
