"use server";

import postgres, { Row } from "postgres";
import { Media } from "../definitions";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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
};

export async function removeUserMedia(librarieId: number, category: string) {

    try {
        await sql`DELETE FROM libraries WHERE id = ${librarieId};`;

        revalidatePath(`/dashboard/${category}s`);

    } catch (error) {
        console.error(error)
    }
};

export type UpdateState = {
    success? : boolean;
    message? : string;
    data?: Row
};

export async function AddComment(librarie_id: number, comment: string): Promise<UpdateState> {

    const session= await auth();
    const email = session?.user?.email;

    const sanitize= (text: string): string=> {
        return text.replace(/<[^>]*>?/gm, "");
    };
    const cleanComment: string = sanitize(comment);

    if(!email) {
        return {message : "You should be connected to do this action"}
    };

    try {

        const result = await sql`UPDATE libraries AS l
                                                SET comment = ${cleanComment}
                                                FROM medias AS m
                                                WHERE l.id = ${librarie_id}
                                                AND m.id=l.media_id
                                                RETURNING l.comment, l.media_id, m.category`;

        if (result.length === 0) {
            return { success: false, message: "Aucune librairie trouvée avec cet ID." };
        };

        const row= result[0]

        revalidatePath(`/dashboard/${row.category}/${row.media_id}`);

        return {
            success: true,
            message: "Commentaire ajouté avec succès.",
            data: row
        };
    
    } catch (error) {
        console.error("Erreur SQL :", error);
        return { success: false, message: "Une erreur est survenue lors de l'ajout du commentaire." };
    }

}

export async function AddNotation(librarie_id: number, rating: number): Promise<UpdateState> {

    const session= await auth();
    const email = session?.user?.email;

    if(!email) {
        return {message : "You should be connected to do this action"}
    };

    try {

        const result = await sql`UPDATE libraries AS l
                                SET notation = ${rating}
                                FROM medias AS m
                                WHERE l.id = ${librarie_id}
                                AND m.id = l.media_id
                                RETURNING l.notation, l.media_id, m.category;`;

        if (result.length === 0) {
            return { success: false, message: "Aucune librairie trouvée avec cet ID." };
        };

        const row= result[0]
        
        revalidatePath(`/dashboard/${row.category}/${row.media_id}`);
        
        return {
            success: true,
            message: "Note ajoutée avec succès.",
            data: row
        };

    
    } catch (error) {
        console.error("Erreur SQL :", error);
        return { success: false, message: "Une erreur est survenue lors de l'ajout de la note." };
    }


}