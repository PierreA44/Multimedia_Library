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
        <button type="button" onClick={()=> addMedia(mediaId, email)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors hover:shadow-md">
            <PlusCircleIcon className="w-5 h-5"/>
            <span className="text-sm">Add</span>
        </button>
    )
}