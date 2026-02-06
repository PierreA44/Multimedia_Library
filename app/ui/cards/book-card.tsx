import { Book } from "../../lib/definitions";
import { comments } from "@/app/lib/placeholder-data";

export default function BookCard( {book}: { book:Book }) {


    const commentBook: string = "aucun commentaire pour le moment";
    console.log(book);
    
    // if(comments.filter((comment)=>comment.multimediaId === book.id).length > 0) {
    //     commentBook = comments.filter((comment)=>comment.multimediaId === book.id)[0].text}


    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                <p className="text-amber-100">📚 Book</p>
            </div>
            <div className="p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">AUTHOR</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">{book.author}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">PUBLICATION YEAR</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">{book.original_publishing}</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm font-semibold">GENRE</p>
                    <p className="text-xl text-slate-900 font-semibold mt-1">{book.genre}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-6">
                    <p className="text-slate-600 text-sm font-semibold mb-3">COMMENT</p>
                    <p className="text-slate-800 italic">"{commentBook}"</p>
                </div>
            </div>
        </div>
    )
}