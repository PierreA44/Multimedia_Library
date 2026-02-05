"use client";

import { BookState, createBook } from "@/app/lib/actions/book-action"
import { useActionState } from "react";

export default function BookForm() {

    const initialState: BookState = { errors: {}, message: null};
    const [state, formAction] = useActionState(createBook, initialState)
    const genreOptions: string[]= ["roman", "nouvelle", "conte", "biographie", "théâtre", "poésie", "essai"];

    return (
        <form action={formAction} className="space-y-6 rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">Titre du livre</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Entrez le titre du livre"
                    className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
                {state.errors?.title &&
                    state.errors.title.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>))}
            </div>

            <div>
                <label htmlFor="author" className="block text-sm font-semibold text-white mb-2">Auteur du livre</label>
                <input 
                    type="text" 
                    name="author" 
                    id="author" 
                    placeholder="Entrez le nom de l'auteur"
                    className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
            </div>

            <div>
                <label htmlFor="originalPublishing" className="block text-sm font-semibold text-white mb-2">Année de publication originale</label>
                <input 
                    type="number" 
                    name="originalPublishing" 
                    id="originalPublishing" 
                    placeholder="Entrez l'année de publication"
                    className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
            </div>
            
            <div>
                <label htmlFor="genre-select" className="block text-sm font-semibold text-white mb-2">Sélectionnez le genre du livre</label>
                <select 
                    name="genre" 
                    id="genre-select" 
                    className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                >
                    <option value="">-</option>
                    {genreOptions.map((g)=> <option value={g} key={g}>{g}</option>)}
                </select>
            </div>

            <button 
                type="submit" 
                className="w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
            >
                Ajouter le livre
            </button>
        </form>
    )
}