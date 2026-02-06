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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Search & Add Media</h1>
                <div className="mt-8">
                    <TableMedia medias={medias} email={email}/>
                </div>
            </div>
        </div>
    )
};