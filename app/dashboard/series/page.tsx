import { fetchSeries } from "@/app/lib/actions/serie-action"
import { Serie } from "@/app/lib/definitions"
import Link from "next/link"

export default async function SeriesPage() {

    const series: Serie[]= await fetchSeries();

    return (
        <div>
            <h1 className="flex m-2 text-2xl justify-center">My Series</h1>
            <div className="flex flex-col">
                   {series.map((serie) =>{
                    return(
                        <Link href={`/dashboard/series/${serie.id}`} className="py-2" key={serie.id}>{serie.title} - {serie.seasons} saisons</Link>
                    )
                    })}

            </div>
     
            
        </div>
    )
}