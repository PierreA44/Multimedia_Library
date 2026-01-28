import Link from "next/link";
import { BookOpenIcon, FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import { fetchBook, fetchUserBooks } from "@/app/lib/actions/book-action";
import { fetchMovies, fetchUserMovies } from "@/app/lib/actions/movie-action";
import { Book, Movie, Serie } from "@/app/lib/definitions";
import { fetchSeries, fetchUserSeries } from "@/app/lib/actions/serie-action";
import { auth } from "@/auth";

export default async function DashboardPage() {

    const session = await auth();

    let movies : Movie[] | null = await fetchMovies();
    let books : Book[] | null = await fetchBook();
    let series : Serie[] | null = await fetchSeries();

    if(session?.user) {
        const email = session.user.email
        movies = await fetchUserMovies(email);
        books = await fetchUserBooks(email);
        series = await fetchUserSeries(email);
    };


    return (
        <div className="flex flex-col items-center gap-2">
            <div className="py-8 px-6 border-2 border-solid border-black rounded-xl w-full bg-movie">
                <h2 className="underline text-xl">Mes 3 derniers films</h2>
                <div className="flex flex-row mt-2 gap-6 justify-around">
                    {movies && movies.slice(-3).map((movie) => {
                        return(
                        <Link href={`/dashboard/movies/${movie.id}`} key={movie.id} className="flex flex-col items-center w-40 text-center hover:scale-115" >
                            <FilmIcon />
                            <p>{movie.title}</p>
                        </Link>
                        )
                    })}
                </div>
            </div>
            <div className="py-8 px-6 border-2 border-solid border-black rounded-xl w-full bg-serie">
                <h2 className="underline text-xl">Mes 3 dernières séries</h2>
                <div className="flex flex-row mt-2 gap-6 justify-around">
                    {series && series.slice(-3).map((serie) => {
                        return(
                        <Link href={`/dashboard/series/${serie.id}`} key={serie.id} className="flex flex-col items-center w-40 text-center hover:scale-115">
                            <TvIcon />
                            <p>{serie.title}</p>
                        </Link>
                        )
                    })}
                    </div>
            </div>
            <div className="py-8 px-6 border-2 border-solid border-black rounded-xl w-full bg-book">
                <h2 className="underline text-xl">Mes 3 derniers livres</h2>
                <div className="flex flex-row mt-2 gap-6 justify-around">
                    {books && books.slice(-3).map((book) => {
                        return(
                        <Link href={`/dashboard/books/${book.id}`} key={book.id} className="flex flex-col items-center w-40 text-center hover:scale-115">
                            <BookOpenIcon />
                            <p>{book.title}</p>
                        </Link>
                        )
                    })}
                </div>
            </div>
        </div>
            )
}