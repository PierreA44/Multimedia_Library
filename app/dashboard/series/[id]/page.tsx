import { Serie } from "@/app/lib/definitions";
import { series } from "@/app/lib/placeholder-data";
import SerieCard from "@/app/ui/cards/serie-card";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = parseInt(params.id.slice(1), 10);
    const serie:Serie = series[id-1];

    return (
        <SerieCard serie={serie}/>
    )
}