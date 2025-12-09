import { books } from "@/app/lib/placeholder-data"
import Link from "next/link"

export default function BooksPage() {

    return (
        <div>
            <h1 className="flex m-2 text-2xl justify-center">My Books</h1>
            <div className="flex flex-col">
                   {books.map((book) =>{
                    return(
                        <Link href={`/dashboard/books/${book.id}`} className="py-2" key={book.id}>{book.title} - {book.genre}</Link>
                    )
                    })}

            </div>
     
            
        </div>
    )
}