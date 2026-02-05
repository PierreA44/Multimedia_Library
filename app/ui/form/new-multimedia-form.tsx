"use client";

import { useState } from "react";
import MovieForm from "./movie-form";
import SerieForm from "./serie-form";
import BookForm from "./book-form";

export default function NewMultimediaForm () {

    const categoryOption: string[] = ["movie", "serie", "book"];
    const [category, setCategory] = useState("");

    return (
        <div className="text-white my-5 px-6">
            <div>
                <p>Aucun média ne correspond à votre recherche, vous pouvez l&apos;ajouter ici :</p>
            </div>
            <>
                <label htmlFor="category">Sélectionnez la catégorie du média à ajouter</label>
                <select name="category" id="category" className="text-black bg-white w-15 m-2" onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="">-</option>
                    {categoryOption.map((opt)=>
                        <option value={opt} key={opt}>{opt}</option>
                    )}
                </select>
                {category === "movie" && 
                    <MovieForm />}
                {category === "serie" && 
                    <SerieForm />}
                {category === "book" && 
                    <BookForm />}                
            </>
        </div>
    )
}