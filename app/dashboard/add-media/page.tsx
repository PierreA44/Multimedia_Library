import { fetchMedias } from "@/app/lib/actions/medias-action";
import { Media } from "@/app/lib/definitions";
import TableMedia from "@/app/ui/table-media";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AddMediaPage() {

    const session = await auth();
    let email: string= "";
    
    if(!session?.user) {
        redirect('/');
    };

    let medias:Media[] = [];

    if(session.user.email) {
        email= session.user.email
        medias = await fetchMedias(email);
    };


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black p-8">
            <h1 className="text-4xl font-bold text-white mb-8">Rechercher un média parmi la base de donnée</h1>
            <div className="mt-8 overflow-x-auto">
                <TableMedia medias={medias} email={email}/>
            </div>
        </div>
    )
};