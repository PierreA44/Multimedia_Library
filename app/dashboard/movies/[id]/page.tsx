import { fetchMovieById } from "@/app/lib/actions/movie-action";
import { Movie } from "@/app/lib/definitions";
import MovieCard from "@/app/ui/cards/movie-card";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const movie:Movie = await fetchMovieById(params.id);

    return (
        <MovieCard movie={movie} />
    )
}
