"use client";

import { BookState, createBook } from "@/app/lib/actions/book-action"
import { useActionState } from "react";

export default function BookForm() {

    const initialState: BookState = { errors: {}, message: null};
    const [state, formAction] = useActionState(createBook, initialState)
    

    return (
        <form action={formAction} className="bg-gray-400 p-4">
            <label htmlFor="title">Titre du livre</label>
            <input type="text" name="title" id="title" className="bg-white" />
                {state.errors?.title &&
              state.errors.title.map((error:string)=>(
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>))}

            <label htmlFor="author">Auteur du livre</label>
            <input type="text" name="author" id="author" className="bg-white"/>
            <label htmlFor="originalPublishing">Quelle est l&apos;année de publication originale</label>
            <input type="number" name="originalPublishing" id="originalPublishing" className="bg-white" />
            <label htmlFor="genre-select">Sélectionnez le genre du livre</label>
            <select name="genre" id="genre-select" className="bg-white">
                <option value="">-</option>
                <option value="roman">Roman</option>
                <option value="nouvelle">Nouvelle</option>
                <option value="conte">Conte</option>
                <option value="biographie">Biographie</option>
                <option value="théâtre">Théâtre</option>
                <option value="poésie">Poésie</option>
                <option value="essai">Essai</option>
            </select>
            <button type="submit" className="p-2 rounded-md">Envoyer</button>
        </form>
    )
}