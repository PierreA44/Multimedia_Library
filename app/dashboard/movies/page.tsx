import { fetchMovies } from "@/app/lib/actions/movie-action"
import { Movie } from "@/app/lib/definitions";
import Link from "next/link"

export default async function MoviesPage() {

    const movies: Movie[] | null = await fetchMovies();

    return (
        <div>
            <h1 className="flex text-2xl justify-center m-2">My Movies</h1>
            <div className="flex flex-col">
                   {movies && movies.map((movie) => {
                    return(
                        <Link href={`/dashboard/movies/${movie.id}`} className="py-2" key={movie.id}>{movie.title} - {movie.year}</Link>
                    )
                    })}

            </div>
     
            
        </div>
    )
}