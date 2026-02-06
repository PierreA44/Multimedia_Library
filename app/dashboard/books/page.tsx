import { fetchUserBooks } from "@/app/lib/actions/book-action"
import Link from "next/link"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Book } from "@/app/lib/definitions";
import { Session } from "next-auth";

export default async function BooksPage() {

    const session : Session | null = await auth();

    const email = session?.user?.email;

if(!email) {
    redirect("/")
};

    const books: Book[] | null = await fetchUserBooks(email);


    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">My Books</h1>
                <div className="space-y-3">
                   {books?.length ? books.map((book) =>{
                    return(
                        <Link href={`/dashboard/books/${book.id}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-amber-500 hover:border-amber-600 text-slate-800 hover:text-amber-600" key={book.id}>
                            <span className="font-semibold">{book.title}</span>
                        </Link>
                    )
                    }):
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-slate-600 mb-4">Vous n&apos;avez pas encore de livre dans votre bibliothèque.</p>
                        <Link href={"/dashboard/add-media"} className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">Ajouter un livre</Link>
                    </div>
                    }

                </div>            
            </div>
        </div>
    )
}