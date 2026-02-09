import { Suspense } from "react";
import UserForm from "../ui/form/user-form";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
                <Suspense>
                    <UserForm />
                </Suspense>
            </div>
        </main>
    );
}