import Link from "next/link";
import Logo from "../logo";
import NavLinks from "./nav-links";

export default function SideNav () {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link className="mb-2 flex h-20 items-end justify-start rounded-md md:h-40" href="/">
                <div className="w-32 md:w-40">
                    <Logo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
            </div>
        </div>
    )
}