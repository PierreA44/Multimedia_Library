"use client";

import { useState } from "react";
import MovieForm from "./movie-form";
import SerieForm from "./serie-form";
import BookForm from "./book-form";

export default function NewMultimediaForm () {

    const categoryOption: string[] = ["movie", "serie", "book"];
    const [category, setCategory] = useState("");

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <div>
                <p className="text-slate-700 text-lg mb-6 font-semibold">No media found. You can add a new one:</p>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">Select media type</label>
                    <select name="category" id="category" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:border-blue-500 focus:outline-none" onChange={(e)=>{setCategory(e.target.value)}}>
                        <option value="">Choose a type...</option>
                        {categoryOption.map((opt)=>
                            <option value={opt} key={opt} className="capitalize">{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                        )}
                    </select>
                </div>
                <div className="mt-6">
                    {category === "movie" && 
                        <MovieForm />}
                    {category === "serie" && 
                        <SerieForm />}
                    {category === "book" && 
                        <BookForm />}                
                </div>
            </div>
        </div>
    )
}