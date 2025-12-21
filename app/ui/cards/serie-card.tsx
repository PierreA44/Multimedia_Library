import { Serie } from "../../lib/definitions";
import { comments } from "@/app/lib/placeholder-data";

export default function SerieCard( {serie} : { serie:Serie } ) {
    const commentSerie: string = comments.filter((comment)=>comment.multimediaId === serie.id)[0].text;

    return (
        <>
            <h1>{serie.title}</h1>
            <p>Nombre de saisons : {serie.numberOfSeasons}</p>
            {serie.endYear? (<p>Entre {serie.startYear} et {serie.endYear}</p>):(<p>Depuis {serie.startYear}</p>)}
            <p>{commentSerie}</p>
        </>
    )
}