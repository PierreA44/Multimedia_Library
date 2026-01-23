import { fetchBook } from "@/app/lib/actions/book-action"
import BookForm from "@/app/ui/form/book-form"
import Link from "next/link"
import { Book } from "@/app/lib/definitions";

export default async function BooksPage() {

    const books: Book[] | null = await fetchBook();

    return (
        <div className="bg-amber-300 h-full p-4">
            <h1 className="flex m-2 text-2xl justify-center">My Books</h1>
            <div className="flex flex-col">
                   {books && books.map((book) =>{
                    return(
                        <Link href={`/dashboard/books/${book.id}`} className="py-2" key={book.id}>{book.title} - {book.genre}</Link>
                    )
                    })}

            </div>
            <BookForm />
            
        </div>
    )
}