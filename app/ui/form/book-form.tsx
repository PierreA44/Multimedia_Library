"use client";

import { BookState, createBook } from "@/app/lib/actions/book-action"
import { useRouter } from "next/router";
import { useActionState, useEffect } from "react";

export default function BookForm() {

    const initialState: BookState = { errors: {}, message: null, fields: {}, redirectTo: null};
    const [state, formAction] = useActionState(createBook, initialState)
    const genreOptions: string[]= ["roman", "nouvelle", "conte", "biographie", "théâtre", "poésie", "essai"];

    const router = useRouter();
    useEffect(() => {
        if (state.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state.redirectTo, router]);


    return (
        <form action={formAction} className="space-y-5 rounded-lg bg-white border border-slate-200 shadow-lg p-8">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">Title*</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Enter book title"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
            </div>
            {state.errors?.title &&
                    state.errors.title.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

            <div>
                <label htmlFor="author" className="block text-sm font-semibold text-slate-900 mb-2">Author*</label>
                <input 
                    type="text" 
                    name="author" 
                    id="author" 
                    placeholder="Enter author name"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
            </div>
            {state.errors?.author &&
                    state.errors.author.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

            <div>
                <label htmlFor="original_publishing" className="block text-sm font-semibold text-slate-900 mb-2">Original Publication Year*</label>
                <input 
                    type="number" 
                    name="original_publishing" 
                    id="original_publishing" 
                    placeholder="Enter publication year"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
            </div>
            {state.errors?.original_publishing &&
                    state.errors.original_publishing.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}
            
            <div>
                <label htmlFor="genre-select" className="block text-sm font-semibold text-slate-900 mb-2">Genre*</label>
                <select 
                    name="genre" 
                    id="genre-select" 
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                >
                    <option value="">Choose genre...</option>
                    {genreOptions.map((g)=> <option value={g} key={g} className="capitalize">{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                </select>
            </div>
            {state.errors?.genre &&
                    state.errors.genre.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

            <p className="text-xs">* champs obligatoires</p>


            <button 
                type="submit" 
                className="w-full rounded-lg bg-linear-to-r from-amber-600 to-amber-700 px-4 py-2 font-semibold text-white transition-all hover:from-amber-700 hover:to-amber-800 hover:shadow-lg active:scale-95"
            >
                Add Book
            </button>
        </form>
    )
}