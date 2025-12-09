import { Serie } from "../../lib/definitions";

export default function SerieCard( {serie} : { serie:Serie } ) {
    return (
        <>
            <h1>{serie.title}</h1>
            <p>Nombre de saisons : {serie.numberOfSeasons}</p>
            {serie.endYear? (<p>Entre {serie.startYear} et {serie.endYear}</p>):(<p>Depuis {serie.startYear}</p>)}
        </>
    )
}