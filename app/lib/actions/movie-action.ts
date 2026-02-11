"use server";

import  {z} from "zod";
import postgres, { Row, RowList } from "postgres";
import { refresh, revalidatePath } from "next/cache";
import { Movie } from "../definitions";
import { Session } from "next-auth";
import { auth } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const year: number = new Date().getFullYear();


const MovieFormSchema = z.object({
    id: z.string(),
    title: z.string().min(3),
    director: z.string().min(5),
    year: z.coerce.number().gte(1900, "l'année doit être supérieur à 1900").lte(year, `L'année ne pas pas dépasser ${year}`),
    duration: z.preprocess((val)=> val === "" || val === undefined ? null : Number(val),
                    z.number()
                        .gte(10)
                        .lte(300)
                        .nullable(),)    
});

export type MovieState = {
    errors? :{
        title?: string[];
        director?: string[];
        year?: string[];
        duration?: string[];
    };
    message?: string | null;
    fields?: {
        title? : string;
        director? : string;
        year? : string;
        duration? : string;
    };
    redirectTo? : string | null;
}

const CreateMovie = MovieFormSchema.omit({id: true});

export async function createMovie (prevState: MovieState, formData: FormData): Promise<MovieState> {
    const validateFields = CreateMovie.safeParse({
        title: formData.get("title"),
        director : formData.get("director"),
        year: formData.get("year"),
        duration: formData.get("duration"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create movie",
            fields: {
                title: formData.get("title")?.toString() ?? "",
                director: formData.get("director")?.toString() ?? "",
                year: formData.get("year")?.toString() ?? "",
                duration: formData.get("duration")?.toString() ?? "",
                }
        };
    };

    const {title, director, year, duration} = validateFields.data;
    const normalizedTitle: string = title.toLocaleLowerCase();

    const session: Session | null = await auth();

    try {
        const [result] = await sql`SELECT id FROM medias WHERE title=${normalizedTitle} AND category='movie';`;

        if(result) {
            return {message: "Movie already created"};
        };

        if(session?.user?.email) {
            const newMovie: RowList<Row[]> = await sql`
            INSERT INTO medias (title, category, director, year, duration)
            VALUES (${normalizedTitle}, 'movie', ${director}, ${year}, ${duration})
            RETURNING id;`;

            const userId: RowList<Row[]> = await sql`SELECT id FROM users WHERE email=${session.user.email};`;

            if(userId.length === 0) {
                return {message: "User not found"};
            };

            await sql`INSERT INTO libraries (user_id, media_id) VALUES (${userId[0].id}, ${newMovie[0].id});`;

            revalidatePath("dashboard/add-media");
            refresh();

            return {message : `Movie created succesfully`,
                    redirectTo: `/dashboard/movies/${newMovie[0].id}`
            }

            } else return {message: "User not found"};

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

        const movies: Movie[] = await sql`SELECT m.id, m.title, m.category, l.id AS librarie_id FROM libraries l
                                            INNER JOIN medias m on l.media_id = m.id
                                            WHERE l.user_id=${userId[0].id} AND m.category = 'movie';`;
        return movies;
        
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function fetchMovieById(id:string): Promise<Movie> {

    const emptyMovie : Movie = {
        id: 0,
        title: 'no movie',
        director :"",
        year: 0,
        duration: null,
        category: "movie",
        librarie_id:0
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