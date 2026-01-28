"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { Book } from "../definitions";
import { auth } from "@/auth";

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

    const session = await auth();

    try {
        await sql`
            INSERT INTO medias (title, category, author, original_publishing, genre)
            VALUES (${title}, 'book', ${author}, ${originalPublishing}, ${genre});`;

        const mediaId = await sql`SELECT id FROM medias ORDER BY id DESC LIMIT 1`;
        const userId = await sql`SELECT id FROM users WHERE email=${session?.user?.email}`
        console.log(mediaId, userId)

        await sql`INSERT INTO libraries (user_id, media_id) VALUES (${userId[0].id}, ${mediaId[0].id})`

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

export async function fetchUserBooks(email: string): Promise<Book[] | null> {

    try {
        const userId = await sql`SELECT id FROM users WHERE email=${email}`;

        const books: Book[] = await sql`SELECT medias.id, medias.title FROM libraries
                                            INNER JOIN medias on libraries.media_id = medias.id
                                            WHERE libraries.user_id=${userId[0].id} AND medias.category = 'book';`;

        return books;
        
    } catch (error) {
        console.error(error);
        return null
    }
};

export async function fetchBookById(id:string): Promise<Book> {

       const emptyBook : Book = {
        id: "0",
        title: "No book",
        author: "none",
        original_publishing : null,
        genre: "nouvelle"
    };

    try {
        const book: Book[] = await sql`SELECT id, title, author, original_publishing, genre FROM medias WHERE id=${id}`;
        if(book[0]) {
            return book[0];

        } else return emptyBook;

    } catch (error) {
        console.error(error);
        return emptyBook
    };
};
