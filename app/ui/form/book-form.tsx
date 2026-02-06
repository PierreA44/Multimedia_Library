"use client";

import { BookState, createBook } from "@/app/lib/actions/book-action"
import { useActionState } from "react";

export default function BookForm() {

    const initialState: BookState = { errors: {}, message: null};
    const [state, formAction] = useActionState(createBook, initialState)
    const genreOptions: string[]= ["roman", "nouvelle", "conte", "biographie", "théâtre", "poésie", "essai"];

    return (
        <form action={formAction} className="space-y-5 rounded-lg bg-white border border-slate-200 shadow-lg p-8">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Enter book title"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
                {state.errors?.title &&
                    state.errors.title.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}
            </div>

            <div>
                <label htmlFor="author" className="block text-sm font-semibold text-slate-900 mb-2">Author</label>
                <input 
                    type="text" 
                    name="author" 
                    id="author" 
                    placeholder="Enter author name"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
            </div>

            <div>
                <label htmlFor="originalPublishing" className="block text-sm font-semibold text-slate-900 mb-2">Original Publication Year</label>
                <input 
                    type="number" 
                    name="originalPublishing" 
                    id="originalPublishing" 
                    placeholder="Enter publication year"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
            </div>
            
            <div>
                <label htmlFor="genre-select" className="block text-sm font-semibold text-slate-900 mb-2">Genre</label>
                <select 
                    name="genre" 
                    id="genre-select" 
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                >
                    <option value="">Choose genre...</option>
                    {genreOptions.map((g)=> <option value={g} key={g} className="capitalize">{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                </select>
            </div>

            <button 
                type="submit" 
                className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2 font-semibold text-white transition-all hover:from-amber-700 hover:to-amber-800 hover:shadow-lg active:scale-95"
            >
                Add Book
            </button>
        </form>
    )
}