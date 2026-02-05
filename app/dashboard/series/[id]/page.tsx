import { fetchSerieById } from "@/app/lib/actions/serie-action";
import { Serie } from "@/app/lib/definitions";
import SerieCard from "@/app/ui/cards/serie-card";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const serie:Serie | null = await fetchSerieById(params.id);

    return (
        <SerieCard serie={serie}/>
    )
}