import { Movie } from "@/app/lib/definitions";
import { movies } from "@/app/lib/placeholder-data";
import MovieCard from "@/app/ui/cards/movie-card";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = parseInt(params.id.slice(1), 10);
    const movie:Movie = movies[id-1];
    return (
        <MovieCard movie={movie} />
    )
}
