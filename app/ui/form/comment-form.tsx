export default function CommentForm() {
    return (
        <form>
            <h1>Ajout d&apos;un avis</h1>
            <label htmlFor="comment-area"></label>
            <textarea name="comment-area" id="comment-area" className="bg-white"></textarea>
        </form>
    )
}