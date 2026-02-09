"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import {z} from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .refine((val) => /[a-z]/.test(val), {
    message: "Le mot de passe doit contenir au moins une lettre minuscule",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Le mot de passe doit contenir au moins une lettre majuscule",
  })
  .refine((val) => /\d/.test(val), {
    message: "Le mot de passe doit contenir au moins un chiffre",
  })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), {
    message: "Le mot de passe doit contenir au moins un caractère spécial",
  });

const UserFormSchema = z.object({
    name: z.string(),
    email: z.email(),
    confirmEmail: z.email(),
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data)=> data.email === data.confirmEmail, {
    message : "Les emails doivent être identiques",
    path: ["confirmEmail"],
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Les mots de passes doivent être identiques",
    path: ["confirmPassword"]
});

export type UserState = {
    errors? : {
        name?: string[];
        email?: string[];
        confirmEmail?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
    fields?: {
        name?: string;
        email?: string;
        confirmEmail?: string;
        password?: string;
        confirmPassword?: string;
    }
    redirectTo?: string | null;
};

export async function createUser (prevState:UserState, formData: FormData): Promise<UserState> {

    const validateFields = UserFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        confirmEmail: formData.get("confirmEmail"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create user.",
            fields: {
                name: formData.get("name")?.toString() ?? "",
                email: formData.get("email")?.toString() ??" ",
                confirmEmail: formData.get("confirmEmail")?.toString() ?? "",
                password: formData.get("password")?.toString() ?? "",
                confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
            }
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
