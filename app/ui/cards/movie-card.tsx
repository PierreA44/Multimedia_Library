import { Movie } from "@/app/lib/definitions";
import CommentForm from "@/app/ui/form/comment-form";
import { comments } from "@/app/lib/placeholder-data";

export default function MovieCard( {movie}: {movie:Movie}) {

const commentMovie: string = comments.filter((comment)=>comment.multimediaId === movie.id)[0].text;

    return (
        <div className="bg-movie p-4 text-[#BAD1CD]">
            <h1 className="text-xl">{movie.title}</h1>
            <p>Réalisateur: {movie.director}</p>
            <p>Sortie en {movie.year}</p>
            {movie.duration && <p>Durée: {movie.duration}min</p>}
            <p>{commentMovie}</p>
            <CommentForm />
        </div>
    )
}