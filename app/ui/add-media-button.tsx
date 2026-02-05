import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { addUserMedia, fetchMedias } from "../lib/actions/medias-action";
import { Media } from "../lib/definitions";

export default function AddMediaButton ({mediaId, email, setUpdateMedia}: {mediaId: number, email:string, setUpdateMedia: (arg: Media[] | null)=>void}) {

    const addMedia = async (mediaId: number, email:string) => {
        await addUserMedia(mediaId, email);
        const mediasUpdated = await fetchMedias(email)
        setUpdateMedia(mediasUpdated);
    }

    return(
        <button type="button" onClick={()=> addMedia(mediaId, email)} className="cursor-pointer">
            <PlusCircleIcon className="w-6"/>
        </button>
    )
}