import { fetchUserBooks } from "@/app/lib/actions/book-action"
import Link from "next/link"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function BooksPage() {

    const session = await auth();


    const email = session?.user?.email;

if(!email) {
    redirect("/")
};

    const books = await fetchUserBooks(email);


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
        </div>
    )
}