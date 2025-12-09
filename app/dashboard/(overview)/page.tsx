import { books, movies, series } from "@/app/lib/placeholder-data";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div>
            <div className="py-4">
                <h2 className="underline text-xl">Mes 3 derniers films</h2>
                <div className="flex flex-col mt-2">
                    {movies.slice(-3).map((movie) => {
                        return(
                        <Link href={`/dashboard/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>
                        )
                    })}
                </div>
            </div>
            <div className="py-4">
                <h2 className="underline text-xl">Mes 3 dernières séries</h2>
                <div className="flex flex-col mt-2">
                    {series.slice(-3).map((serie) => {
                        return(
                        <Link href={`/dashboard/series/${serie.id}`} key={serie.id}>{serie.title}</Link>
                        )
                    })}
                    </div>
            </div>
            <div className="py-4">
                <h2 className="underline text-xl">Mes 3 derniers livres</h2>
                <div className="flex flex-col mt-2">
                    {books.slice(-3).map((book) => {
                        return(
                        <Link href={`/dashboard/books/${book.id}`} key={book.id}>{book.title}</Link>
                        )
                    })}
                </div>
            </div>
        </div>
            )
}