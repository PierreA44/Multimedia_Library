export default function CommentForm() {
    return (
        <form className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Add a Comment</h2>
            <div>
                <label htmlFor="comment-area" className="block text-sm font-semibold text-slate-700 mb-2">Your Comment</label>
                <textarea 
                    name="comment-area" 
                    id="comment-area" 
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all resize-none p-2"
                    rows={5}
                    placeholder="Write your comment here..."
                />
            </div>
        </form>
    )
}