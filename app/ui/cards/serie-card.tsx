import { Serie } from "../../lib/definitions";
import { comments } from "@/app/lib/placeholder-data";

export default function SerieCard( {serie} : { serie:Serie | null } ) {
    

    let commentSerie: string = "aucun commentaire pour le moment";
    
    if(serie && comments.filter((comment)=> comment.multimediaId === serie.id).length > 0){
        commentSerie = comments.filter((comment)=>comment.multimediaId === serie.id)[0].text
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
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
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mt-6">
                    <p className="text-slate-600 text-sm font-semibold mb-3">COMMENT</p>
                    <p className="text-slate-800 italic">"{commentSerie}"</p>
                </div>
            </div>
        </div>
    )
}