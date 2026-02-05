'use client';

import { createMovie, MovieState } from "@/app/lib/actions/movie-action";
import { useActionState } from "react";

export default function MovieForm() {

    const initialState: MovieState = {errors: {}, message: null};
    const [state, formAction] = useActionState(createMovie, initialState)


  return (
    <form action={formAction} className="space-y-6 rounded-lg border border-purple-500/30 bg-purple-500/10 p-8 backdrop-blur-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Entrez le titre du film"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>
      {state.errors?.title &&
                    state.errors.title.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>))}

      <div>
        <label htmlFor="director" className="block text-sm font-semibold text-white mb-2">
          Réalisateur
        </label>
        <input
          id="director"
          name="director"
          type="text"
          placeholder="Entrez le nom du réalisateur"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-semibold text-white mb-2">
          Année
        </label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="Entrez l'année de sortie"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-semibold text-white mb-2">
          Durée (en minutes)
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          placeholder="Entrez la durée du film en minutes"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
      >
        Ajouter le film
      </button>
    </form>
  );
}
