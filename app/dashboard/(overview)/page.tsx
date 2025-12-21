import { books, movies, series } from "@/app/lib/placeholder-data";
import Link from "next/link";
import { BookOpenIcon, FilmIcon, TvIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
    return (
        <div>
            <div className="py-4">
                <h2 className="underline text-xl">Mes 3 derniers films</h2>
                <div className="flex flex-row mt-2 gap-6">
                    {movies.slice(-3).map((movie) => {
                        return(
                        <Link href={`/dashboard/movies/${movie.id}`} key={movie.id} className="flex flex-col items-center w-40 text-center hover:scale-115" >
                            <FilmIcon />
                            <p>{movie.title}</p>
                        </Link>
                        )
                    })}
                </div>
            </div>
            <div className="py-4">
                <h2 className="underline text-xl">Mes 3 dernières séries</h2>
                <div className="flex flex-row mt-2 gap-6">
                    {series.slice(-3).map((serie) => {
                        return(
                        <Link href={`/dashboard/series/${serie.id}`} key={serie.id} className="flex flex-col items-center w-40 text-center hover:scale-115">
                            <TvIcon />
                            <p>{serie.title}</p>
                        </Link>
                        )
                    })}
                    </div>
            </div>
            <div className="py-4">
                <h2 className="underline text-xl">Mes 3 derniers livres</h2>
                <div className="flex flex-row mt-2 gap-6">
                    {books.slice(-3).map((book) => {
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