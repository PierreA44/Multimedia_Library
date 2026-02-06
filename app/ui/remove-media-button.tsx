"use client";

import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { removeUserMedia } from "../lib/actions/medias-action";

export default function RemoveMediaButton ({librarieId, category}: {librarieId: number, category:string}) {

    const removeMedia = async (librarieId: number, category:string) => {
        await removeUserMedia(librarieId, category);
    }

    return(
        <button type="button" onClick={()=> removeMedia(librarieId, category)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors hover:shadow-md active:scale-95">
            <MinusCircleIcon className="w-5 h-5 shrink-0"/>
            <span className="text-sm hidden md:inline">Remove</span>
        </button>
    )
}