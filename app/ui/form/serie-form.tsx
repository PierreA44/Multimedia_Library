'use client';

import { createSerie, SerieState } from "@/app/lib/actions/serie-action";
import { useActionState } from "react";

export default function SerieForm() {

    const initialState: SerieState = { errors: {}, message: null};
    const [state, formAction] = useActionState(createSerie, initialState);

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
          placeholder="Enter series title"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>

      <div>
        <label htmlFor="creator" className="block text-sm font-semibold text-slate-900 mb-2">
          Creator
        </label>
        <input
          id="creator"
          name="creator"
          type="text"
          placeholder="Enter creator name"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-semibold text-slate-900 mb-2">
          Start Year
        </label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="Enter start year"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>

      <div>
        <label htmlFor="seasons" className="block text-sm font-semibold text-slate-900 mb-2">
          Number of Seasons
        </label>
        <input
          id="seasons"
          name="seasons"
          type="number"
          placeholder="Enter number of seasons"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 font-semibold text-white transition-all hover:from-purple-700 hover:to-purple-800 hover:shadow-lg active:scale-95"
      >
        Add Series
      </button>
    </form>
  );
}
