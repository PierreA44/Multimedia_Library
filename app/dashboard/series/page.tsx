import { fetchUserSeries } from "@/app/lib/actions/serie-action"
import { Serie } from "@/app/lib/definitions"
import { auth } from "@/auth";
import { Session } from "next-auth";
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function SeriesPage() {

    const session: Session | null = await auth();

    const email = session?.user?.email;

    if(!email) {
        redirect("/")
    }

    const series: Serie[] | null= await fetchUserSeries(email);

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">My Series</h1>
                <div className="space-y-3">
                   {series?.length ? series.map((serie) =>{
                    return(
                        <Link href={`/dashboard/series/${serie.id}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-purple-500 hover:border-purple-600 text-slate-800 hover:text-purple-600" key={serie.id}>
                            <span className="font-semibold">{serie.title}</span>
                        </Link>
                    )
                    }):
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-slate-600 mb-4">Vous n&apos;avez pas encore de série dans votre bibliothèque.</p>
                        <Link href={"/dashboard/add-media"} className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">Ajouter une série</Link>
                    </div>
                    }

                </div>
            </div>
        </div>
    )
}