export default function CommentForm(
    {commenting, onChange, onSubmit}: 
    {commenting: string, onChange : (v:string)=>void, onSubmit : (v:string)=>void}) {

    return (
        <div className="space-y-4">
                <textarea 
                    name="comment-area" 
                    id="comment-area" 
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all resize-none p-2"
                    rows={5}
                    placeholder={commenting.length > 1 ? commenting : "Write your comment here..."}
                    value={commenting}
                    onChange={(e)=> onChange(e.target.value)}
                />
                <button 
                    type="button" 
                    onClick={()=> onSubmit(commenting)}
                    className="w-full rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-4 py-2 font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95"
                >
                    Valider
                </button>
        </div>
    )
}