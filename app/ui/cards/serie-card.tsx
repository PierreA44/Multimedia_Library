"use client"

import { PencilIcon } from "@heroicons/react/24/outline";
import { Serie } from "../../lib/definitions";
import StarNotation from "../notation";
import { useState } from "react";
import StarRating from "../form/star-rating";
import { AddComment, AddNotation, UpdateState } from "@/app/lib/actions/medias-action";
import CommentForm from "../form/comment-form";

export default function SerieCard( {serie} : { serie:Serie } ) {
    
    const [isNoted, setIsNoted] = useState(false);
    const [rating, setRating] = useState(serie?.notation || 0);
    const handleRatingChange = async (newRating: number) => {
        if(!serie) return;
        setRating(newRating);
        const notation: UpdateState = await AddNotation(serie.librarie_id, newRating);
        if(notation.success) {
            setIsNoted(false);
        };
    };

    const [isCommented, setIsCommented] = useState(false);
    const [commenting, setCommenting] = useState(serie?.comment || "")
    const handleCommentingChange = async (newComment: string) => {
        setCommenting(newComment);
    };

    const handleCommentSubmit = async (newComment: string)=>{
        if(!serie) return;
        const comment: UpdateState = await AddComment(serie.librarie_id, newComment);
        if(comment.success) {
            setIsCommented(false);
        };
    }
    

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-linear-to-r from-purple-500 to-purple-600 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{serie?.title}</h1>
                <p className="text-purple-100">📺 Serie</p>
            </div>
            <div className="p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">NUMBER OF SEASONS</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">{serie?.seasons}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-600 text-sm font-semibold">PERIOD</p>
                        <p className="text-xl text-slate-900 font-semibold mt-1">
                            {serie?.end_year ? (`${serie?.start_year} - ${serie?.end_year}`) : (`Since ${serie?.start_year}`)}
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg relative">
                    <p className="text-slate-600 text-sm font-semibold">NOTATION</p>
                    <button 
                        type="button"
                        onClick={()=>setIsNoted(prev => !prev)}
                        title="modifier"
                        className="absolute top-4 right-4 text-slate-600 hover:text-slate-800 cursor-pointer" >
                        <PencilIcon className="h-5 w-5" />
                    </button>

                    {isNoted ? (
                    <div className="p-3 rounded-md bg-yellow-50 border border-yellow-300 animate-pulse duration-3000 ">
                        <p className="text-sm text-purple-700 mb-1">Mode édition : choisissez une note</p>
                        <StarRating value={rating} onChange={handleRatingChange} />
                    </div>
                    ) : rating ? (
                        <StarNotation notation={rating} />
                    ) : (
                        <p className="text-slate-800 italic">&quot;aucune note pour le moment&quot;</p>
                    )}

                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mt-6 relative">
                    <p className="text-slate-600 text-sm font-semibold mb-3">COMMENT</p>
                    <button 
                        type="button"
                        onClick={()=> setIsCommented(prev => !prev)}
                        title="modifier"
                        className="absolute top-4 right-4 text-slate-600 hover:text-slate-800 cursor-pointer">
                        <PencilIcon className="h-5 w-5" />
                    </button>

                    {isCommented ? (
                        <div className="p-3 rounded-md bg-yellow-50 border border-yellow-300    ">
                            <p className="text-sm text-purple-700 mb-1">Mode édition</p>
                            <CommentForm 
                                commenting={commenting}
                                onChange={handleCommentingChange}
                                onSubmit={handleCommentSubmit} />
                        </div>
                        ) : commenting ? 
                    <p className="text-xl text-slate-900 font-normal mt-1">{serie.comment}</p>
                        :
                    <p className="text-slate-800 italic">&quot;aucun commentaire pour le moment&quot;</p>
                    }
                    
                </div>
            </div>
        </div>
    )
}