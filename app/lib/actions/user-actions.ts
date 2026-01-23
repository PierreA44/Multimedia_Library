"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import {z} from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const UserFormSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

export type UserState = {
    errors? : {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function createUser (prevState:UserState, formData: FormData): Promise<UserState> {

    const validateFields = UserFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create user."
        };
    };

    const {name, email, password} = validateFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`INSERT INTO users (name, email, password)
                VALUES (${name}, ${email}, ${hashedPassword});`;
            revalidatePath("dashboard/");
        return { message: "User created succesfully."}

    } catch (error) {
        console.error(error);
        return { message: "Database error: Failed to create user."}
        
    };
};

export async function authenticate(prevState:string | undefined, formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if( error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin" :
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            };
        };
        throw error;
    }
    
};
