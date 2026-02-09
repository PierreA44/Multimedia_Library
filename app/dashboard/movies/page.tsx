import { fetchUserMovies } from "@/app/lib/actions/movie-action"
import { Movie } from "@/app/lib/definitions";
import RemoveMediaButton from "@/app/ui/remove-media-button";
import { auth } from "@/auth";
import { Session } from "next-auth";
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function MoviesPage() {

    const session: Session | null = await auth();

    const email = session?.user?.email;

    if(!email) {
        redirect("/");
    };

    const movies: Movie[] | null = await fetchUserMovies(email);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-slate-900 mb-8">My Movies</h1>
                <div className="space-y-3">
                   {movies?.length ? movies.map((movie) => {
                    return(
                        <div key={movie.id} className="flex items-center justify-between gap-3 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-500 hover:border-blue-600 overflow-hidden">
                            <Link href={`/dashboard/movies/${movie.id}`} className="flex-1 p-4 text-slate-800 hover:text-blue-600">
                                <span className="font-semibold">{movie.title}</span>
                            </Link>
                            <div className="pr-3">
                                <RemoveMediaButton librarieId={movie.librarie_id} category={"movies"} />
                            </div>
                        </div>
                    )
                    }):
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-slate-600 mb-4">Vous n&apos;avez pas encore de film dans votre bibliothèque.</p>
                        <Link href={"/dashboard/add-media"} className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Ajouter un film</Link>
                    </div>
                    }

                </div>
            </div>
        </div>
    )
}