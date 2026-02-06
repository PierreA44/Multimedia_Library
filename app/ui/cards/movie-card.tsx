import { Movie } from "@/app/lib/definitions";
import { comments } from "@/app/lib/placeholder-data";

export default function MovieCard( {movie}: {movie:Movie}) {

let commentMovie: string = "aucun commentaire pour le moment";

if(comments.filter((comment)=>comment.multimediaId === movie.id).length > 0) {
    commentMovie = comments.filter((comment)=>comment.multimediaId === movie.id)[0].text;
};

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <p className="text-blue-100">🎬 Film</p>
            </div>
            <div className="p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">DIRECTOR</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">{movie.director}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">RELEASE YEAR</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">{movie.year}</p>
                    </div>
                </div>
                {movie.duration && (
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">DURATION</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">{movie.duration} minutes</p>
                    </div>
                )}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6">
                    <p className="text-slate-600 text-sm font-semibold mb-3">COMMENT</p>
                    <p className="text-slate-800 italic">"{commentMovie}"</p>
                </div>
            </div>
        </div>
    )
}