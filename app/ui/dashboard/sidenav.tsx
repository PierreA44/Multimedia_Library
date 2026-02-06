import Link from "next/link";
import Logo from "../logo";
import NavLinks from "./nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav () {
    return (
        <div className="flex h-full flex-col bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 px-3 py-4 md:px-4">
            <Link className="mb-6 flex h-20 items-end justify-start rounded-lg md:h-32" href="/">
                <div className="w-32 md:w-40">
                    <Logo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full rounded-lg bg-slate-200 md:block"></div>
                <form action={async () => {
                    'use server';
                    await signOut({redirectTo: '/'})
                }}>
                    <button className="flex h-12 grow items-center justify-center gap-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg md:flex-none md:justify-start md:p-2 md:px-3 active:scale-95">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    )
}