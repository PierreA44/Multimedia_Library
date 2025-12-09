import { series } from "@/app/lib/placeholder-data"
import Link from "next/link"

export default function SeriesPage() {

    return (
        <div>
            <h1 className="flex m-2 text-2xl justify-center">My Series</h1>
            <div className="flex flex-col">
                   {series.map((serie) =>{
                    return(
                        <Link href={`/dashboard/series/${serie.id}`} className="py-2" key={serie.id}>{serie.title} - {serie.numberOfSeasons} saisons</Link>
                    )
                    })}

            </div>
     
            
        </div>
    )
}