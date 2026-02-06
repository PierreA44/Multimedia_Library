import Link from "next/link";
import { BookOpenIcon, FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import { fetchBook, fetchUserBooks } from "@/app/lib/actions/book-action";
import { fetchMovies, fetchUserMovies } from "@/app/lib/actions/movie-action";
import { Book, Movie, Serie } from "@/app/lib/definitions";
import { fetchSeries, fetchUserSeries } from "@/app/lib/actions/serie-action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await auth();
    if(!session?.user) {
        redirect('/');
    }

    let movies : Movie[] | null = await fetchMovies();
    let books : Book[] | null = await fetchBook();
    let series : Serie[] | null = await fetchSeries();

    if(session?.user) {
        const email = session.user.email
        if(email) {
        movies = await fetchUserMovies(email);
        books = await fetchUserBooks(email);
        series = await fetchUserSeries(email);
        }       
    };


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-6">
                    <FilmIcon className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-900">My Latest Movies</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {movies && movies.slice(-3).map((movie) => {
                        return(
                        <Link href={`/dashboard/movies/${movie.id}`} key={movie.id} className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-shadow border border-blue-200" >
                            <div className="text-3xl mb-2 text-center">🎬</div>
                            <p className="text-center font-semibold text-slate-900 truncate">{movie.title}</p>
                        </Link>
                        )
                    })}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-6">
                    <TvIcon className="w-8 h-8 text-purple-600" />
                    <h2 className="text-2xl font-bold text-slate-900">My Latest Series</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {series && series.slice(-3).map((serie) => {
                        return(
                        <Link href={`/dashboard/series/${serie.id}`} key={serie.id} className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-lg transition-shadow border border-purple-200">
                            <div className="text-3xl mb-2 text-center">📺</div>
                            <p className="text-center font-semibold text-slate-900 truncate">{serie.title}</p>
                        </Link>
                        )
                    })}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-amber-500">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpenIcon className="w-8 h-8 text-amber-600" />
                    <h2 className="text-2xl font-bold text-slate-900">My Latest Books</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {books && books.slice(-3).map((book) => {
                        return(
                        <Link href={`/dashboard/books/${book.id}`} key={book.id} className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:shadow-lg transition-shadow border border-amber-200">
                            <div className="text-3xl mb-2 text-center">📚</div>
                            <p className="text-center font-semibold text-slate-900 truncate">{book.title}</p>
                        </Link>
                        )
                    })}
                </div>
            </div>
        </div>
            )
}