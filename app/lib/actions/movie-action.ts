"use server";

import  {z} from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { Movie } from "../definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

const MovieFormSchema = z.object({
    id: z.string(),
    title: z.string(),
    director: z.string(),
    year: z.number(),
    duration: z.number().nullable(),
});

export type MovieState = {
    errors? :{
        title?: string[];
        director?: string[];
        year?: string[];
        duration?: string[];
    };
    message?: string | null;
}

const CreateMovie = MovieFormSchema.omit({id: true});

export async function createMovie (formData: FormData): Promise<void | MovieState> {
    const validateFields = CreateMovie.safeParse({
        title: formData.get("title"),
        director : formData.get("director"),
        year: formData.get("year"),
        duration: formData.get("duration"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create movie"
        };
    };

    const {title, director, year, duration} = validateFields.data;
    try {
        await sql`
            INSERT INTO medias (title, category, director, year, duration)
            VALUES (${title}, 'movie', ${director}, ${year}, ${duration});`;

            revalidatePath("dashboard/movies");
        return {message : `Movie "${title}" created succesfully`}

    } catch (error) {
        console.error(error);
        return {message: "Database error: Failed to create movie"}
    };
};

export async function fetchMovies(): Promise<Movie[] | null> {

    try {
        const movies: Movie[] = await sql`SELECT id, title, director, year, duration FROM medias WHERE category='movie'`;

        return movies;

    } catch (error) {
        console.error(error);
        return null;
    };
};

export async function fetchUserMovies(email: string): Promise<Movie[] | null> {

    try {
        const userId = await sql`SELECT id FROM users WHERE email=${email}`;

        const movies: Movie[] = await sql`SELECT medias.id, medias.title FROM libraries
                                            INNER JOIN medias on libraries.media_id = medias.id
                                            WHERE libraries.user_id=${userId[0].id} AND medias.category = 'movie';`;

        return movies;
        
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function fetchMovieById(id:string): Promise<Movie> {

    const emptyMovie : Movie = {
        id: '0',
        title: 'no movie',
        director :"",
        year: 0,
        duration: null
    }

    try {
        const movie: Movie[] = await sql`SELECT id, title, director, year, duration FROM medias WHERE id=${id};`;

        if(movie[0]) {
            return movie[0]
        } else return emptyMovie;

    } catch (error) {
        console.error(error);
        return emptyMovie;
    };
};