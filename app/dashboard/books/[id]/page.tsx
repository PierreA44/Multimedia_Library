import { Book } from "@/app/lib/definitions";
import { books } from "@/app/lib/placeholder-data";
import BookCard from "@/app/ui/cards/book-card";

export default async function Page(props: {params : Promise<{id: string}>}) {
    const params = await props.params;
    const id = parseInt(params.id, 10);
    const book:Book = books[id-1];

    return (
        <BookCard book={book} />
    )
}