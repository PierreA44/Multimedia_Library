import { Serie } from "../../lib/definitions";
import { comments } from "@/app/lib/placeholder-data";

export default function SerieCard( {serie} : { serie:Serie | null } ) {
    

    let commentSerie: string = "aucun commentaire pour le moment";
    
    if(serie && comments.filter((comment)=> comment.multimediaId === serie.id).length > 0){
        commentSerie = comments.filter((comment)=>comment.multimediaId === serie.id)[0].text
    }

    return (
        <>
            <h1>{serie?.title}</h1>
            <p>Nombre de saisons : {serie?.seasons}</p>
            {serie?.end_year? (<p>Entre {serie?.start_year} et {serie?.end_year}</p>):(<p>Depuis {serie?.start_year}</p>)}
            <p>{commentSerie}</p>
        </>
    )
}