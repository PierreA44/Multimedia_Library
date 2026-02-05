import { Book } from "../../lib/definitions";
import { comments } from "@/app/lib/placeholder-data";

export default function BookCard( {book}: { book:Book }) {


    const commentBook: string = "aucun commentaire pour le moment";
    console.log(book);
    
    // if(comments.filter((comment)=>comment.multimediaId === book.id).length > 0) {
    //     commentBook = comments.filter((comment)=>comment.multimediaId === book.id)[0].text}


    return (
        <>
            <h1>{book.title}</h1>
            <p>Auteur: {book.author}</p>
            <p>Publication originale en {book.original_publishing}</p>
            <p>Genre: {book.genre}</p>
            <p>Avis:</p>
            <p>{commentBook}</p>
            <p>Notation:</p>
        </>
    )
}