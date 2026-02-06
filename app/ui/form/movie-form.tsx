'use client';

import { createMovie, MovieState } from "@/app/lib/actions/movie-action";
import { useActionState } from "react";

export default function MovieForm() {

    const initialState: MovieState = {errors: {}, message: null};
    const [state, formAction] = useActionState(createMovie, initialState)


  return (
    <form action={formAction} className="space-y-5 rounded-lg bg-white border border-slate-200 shadow-lg p-8">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter movie title"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
        />
      </div>
      {state.errors?.title &&
                    state.errors.title.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

      <div>
        <label htmlFor="director" className="block text-sm font-semibold text-slate-900 mb-2">
          Director
        </label>
        <input
          id="director"
          name="director"
          type="text"
          placeholder="Enter director name"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-semibold text-slate-900 mb-2">
          Release Year
        </label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="Enter release year"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-semibold text-slate-900 mb-2">
          Duration (minutes)
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          placeholder="Enter duration in minutes"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95"
      >
        Add Movie
      </button>
    </form>
  );
}
