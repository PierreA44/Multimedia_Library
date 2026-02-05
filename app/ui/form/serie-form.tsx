'use client';

import { createSerie, SerieState } from "@/app/lib/actions/serie-action";
import { useActionState } from "react";

export default function SerieForm() {

    const initialState: SerieState = { errors: {}, message: null};
    const [state, formAction] = useActionState(createSerie, initialState);

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
          placeholder="Entrez le titre de la série"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <div>
        <label htmlFor="creator" className="block text-sm font-semibold text-white mb-2">
          Créateur
        </label>
        <input
          id="creator"
          name="creator"
          type="text"
          placeholder="Entrez le nom du créateur"
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
          placeholder="Entrez l'année de diffusion"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <div>
        <label htmlFor="seasons" className="block text-sm font-semibold text-white mb-2">
          Nombre de saisons
        </label>
        <input
          id="seasons"
          name="seasons"
          type="number"
          placeholder="Entrez le nombre de saisons"
          className="w-full rounded-lg border border-purple-500/30 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
      >
        Ajouter la série
      </button>
    </form>
  );
}
