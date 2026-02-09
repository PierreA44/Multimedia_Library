'use client';

import { createSerie, SerieState } from "@/app/lib/actions/serie-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function SerieForm() {

    const initialState: SerieState = { errors: {}, message: null, fields: {}, redirectTo: null};
    const [state, formAction] = useActionState(createSerie, initialState);

    const router = useRouter();
    useEffect(()=> {
      if(state.redirectTo) {
        router.push(state.redirectTo);
      }
    }, [state.redirectTo, router]);

  return (
    <form action={formAction} className="space-y-5 rounded-lg bg-white border border-slate-200 shadow-lg p-8">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter series title"
          defaultValue={state.fields?.title ?? ""}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>
      {state.errors?.title &&
                    state.errors.title.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

      <div>
        <label htmlFor="start_year" className="block text-sm font-semibold text-slate-900 mb-2">
          Start Year *
        </label>
        <input
          id="start_year"
          name="start_year"
          type="number"
          placeholder="Enter start year"
          defaultValue={state.fields?.start_year ?? ""}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>
      {state.errors?.start_year &&
                    state.errors.start_year.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

      <div>
        <label htmlFor="end_year" className="block text-sm font-semibold text-slate-900 mb-2">
          End Year
        </label>
        <input
          id="end_year"
          name="end_year"
          type="number"
          placeholder="Enter end year"
          defaultValue={state.fields?.end_year ?? ""}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>
      {state.errors?.end_year &&
                    state.errors.end_year.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

      <div>
        <label htmlFor="seasons" className="block text-sm font-semibold text-slate-900 mb-2">
          Number of Seasons *
        </label>
        <input
          id="seasons"
          name="seasons"
          type="number"
          placeholder="Enter number of seasons"
          defaultValue={state.fields?.seasons ?? ""}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>
      {state.errors?.seasons &&
                    state.errors.seasons.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

      <p className="text-xs">* champs obligatoires</p>

      <button
        type="submit"
        className="w-full rounded-lg bg-linear-to-r from-purple-600 to-purple-700 px-4 py-2 font-semibold text-white transition-all hover:from-purple-700 hover:to-purple-800 hover:shadow-lg active:scale-95"
      >
        Add Series
      </button>
    </form>
  );
}
