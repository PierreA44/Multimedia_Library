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
            <div className="py-4">
                <input type="search" name="search-media" id="search-media" placeholder="Recherche un titre ici" className="bg-white w-50 p-1" onChange={(e)=>searchingMedia(e)}/>
            </div>
            <div>
                <table className="w-full border-collapse border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
                    {updateMedia && updateMedia.length > 0 && 
                    <thead>
                        <tr className="border-b border-purple-500/30 bg-purple-600/20">
                            <th className="border border-purple-500/30 px-6 py-3 text-left font-semibold text-white">Titre</th>
                            <th className="border border-purple-500/30 px-6 py-3 text-left font-semibold text-white">Type de média</th>
                            <th className="border border-purple-500/30 px-6 py-3 text-left font-semibold text-white">Auteur/Réalisateur</th>
                            <th className="border border-purple-500/30 px-6 py-3 text-left font-semibold text-white">Année</th>
                            <th className="border border-purple-500/30 px-6 py-3 text-left font-semibold text-white">Ajouter le media</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {updateMedia && updateMedia.length > 0 && updateMedia.map((media)=>
                        (<tr className="border-b border-purple-500/30 hover:bg-purple-600/20 transition-colors" key={`media${media.id}`}>
                            <td className="border border-purple-500/30 px-6 py-3 text-slate-300">{media.title}</td>
                            <td className="border border-purple-500/30 px-6 py-3 text-slate-300">{media.category}</td>
                            <td className="border border-purple-500/30 px-6 py-3 text-slate-300">{media.director || media.author || "-"}</td>
                            <td className="border border-purple-500/30 px-6 py-3 text-slate-300">{media.year || media.original_publishing || media.start_year}</td>
                            <td className="border border-purple-500/30 px-6 py-3 text-slate-300 text-center">
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