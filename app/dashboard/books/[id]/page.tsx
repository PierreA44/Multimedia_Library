import { fetchBookById } from "@/app/lib/actions/book-action";
import { Book } from "@/app/lib/definitions";
import BookCard from "@/app/ui/cards/book-card";

export default async function Page(props: {params : Promise<{id: string}>}) {
    const params = await props.params;
    const book:Book = await fetchBookById(params.id)

    return (
        <BookCard book={book} />
    )
}