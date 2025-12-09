import { Book } from "../../lib/definitions";

export default function BookCard( {book}: { book:Book }) {
    return (
        <>
            <h1>{book.title}</h1>
            <p>Auteur: {book.author}</p>
            <p>Publication originale en {book.originalPublishing}</p>
            <p>Genre: {book.genre}</p>
            <p>Avis:</p>
            <p>Notation:</p>
        </>
    )
}