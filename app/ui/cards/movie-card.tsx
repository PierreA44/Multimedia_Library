import { Movie } from "../../lib/definitions";

export default function MovieCard( {movie}: {movie:Movie}) {
    return (
        <>
            <h1>{movie.title}</h1>
            <p>Réalisateur: {movie.director}</p>
            <p>Sortie en {movie.year}</p>
            {movie.duration && <p>Durée: {movie.duration}min</p>}
        </>
    )
}