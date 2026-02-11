"use client";

import { ChangeEvent, useState } from "react";
import { Media } from "../lib/definitions";
import AddMediaButton from "./add-media-button";
import NewMultimediaForm from "./form/new-multimedia-form";

export default function TableMedia({medias, email}: {medias: Media[] | null, email: string}){

    const [updateMedia, setUpdateMedia] = useState(medias);

    const searchingMedia = (e: ChangeEvent<HTMLInputElement>)  => {
        const inputTitle: string = e.target.value;
        if(medias && inputTitle.length > 1) {
            setUpdateMedia(medias.filter((media)=> media.title.includes(inputTitle)))
        } else {
            setUpdateMedia(medias)
        }
        
    };

    return(
        <>
            <div className="mb-6">
                <label htmlFor="search-media" className="block text-sm font-semibold text-slate-700 mb-2">Search Media</label>
                <input 
                    type="search" 
                    name="search-media" 
                    id="search-media" 
                    placeholder="Search by title..." 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    onChange={(e)=>searchingMedia(e)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                    {updateMedia && updateMedia.length > 0 && 
                    <thead>
                        <tr className="bg-linear-to-r from-slate-900 to-slate-800 text-white">
                            <th className="px-6 py-3 text-left font-semibold">Title</th>
                            <th className="px-6 py-3 text-left font-semibold">Type</th>
                            <th className="px-6 py-3 text-left font-semibold">Director/Author</th>
                            <th className="px-6 py-3 text-left font-semibold">Year</th>
                            <th className="px-6 py-3 text-center font-semibold">Add</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {updateMedia && updateMedia.length > 0 && updateMedia.map((media)=>
                        (<tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors" key={`media${media.id}`}>
                            <td className="px-6 py-3 text-slate-900">{media.title}</td>
                            <td className="px-6 py-3 text-slate-900 capitalize">{media.category}</td>
                            <td className="px-6 py-3 text-slate-900">{media.director || media.author || "-"}</td>
                            <td className="px-6 py-3 text-slate-900">{media.year || media.original_publishing || media.start_year}</td>
                            <td className="px-6 py-3 text-center">
                                <AddMediaButton mediaId={media.id} email={email} setUpdateMedia={setUpdateMedia} />
                            </td>
                        </tr>)
                        )}                        
                    </tbody>
                </table>
                {updateMedia && updateMedia.length === 0 && 
                    <NewMultimediaForm />}
            </div>
        </>
    )
}