import { BuildingLibraryIcon } from "@heroicons/react/24/solid";

export default function Logo() {
    return (
        <div className="flex flex-row items-center leading-none">
            <BuildingLibraryIcon className="h-12 w-12" />
            <p className="text-[44px]">Logo</p>
        </div>
    )
}