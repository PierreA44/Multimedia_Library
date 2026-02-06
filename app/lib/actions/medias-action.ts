"use server";

import postgres from "postgres";
import { Media } from "../definitions";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });


export async function fetchMedias(email: string): Promise<Media[]> {
    try {
            const medias : Media[] = await sql`
            SELECT DISTINCT m.id, m.title, m.director, m.year, m.start_year, m.original_publishing, m.author
            FROM medias m 
            WHERE NOT EXISTS (
                SELECT 1
                FROM libraries l2
                JOIN users u2 ON u2.id = l2.user_id
                WHERE l2.media_id = m.id
                AND u2.email = ${email})
            ORDER BY m.id ASC;`;

            return medias;

        
    } catch (error) {
        console.error("Error fetching medias:", error);
        throw error;        
    }
};

export async function addUserMedia(mediaId:number, email:string): Promise<void> {
    try {
        const [result] = await sql`SELECT id FROM users WHERE email=${email};`;

        const [existedEntry] = await sql`SELECT * FROM libraries WHERE user_id=${result.id} AND media_id=${mediaId}`;

        if(result.id && !existedEntry) {
            await sql`INSERT INTO libraries (user_id, media_id) VALUES (${result.id}, ${mediaId})`
        };

        revalidatePath("/dashboard/add-media");
        
    } catch (error) {
        console.error(error);
    }
}

export async function removeUserMedia(librarieId: number, category: string) {

    try {
        await sql`DELETE FROM libraries WHERE id = ${librarieId};`;

        revalidatePath(`/dashboard/${category}`);

    } catch (error) {
        console.error(error)
    }
}