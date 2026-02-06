"use client";

import { BookOpenIcon, FilmIcon, HomeIcon, PlusCircleIcon, TvIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const links = [
    {name: "Home", href: "/dashboard", icon: HomeIcon},
    {name: "Movies", href: "/dashboard/movies", icon: FilmIcon},
    {name: "Series", href: "/dashboard/series", icon: TvIcon},
    {name: "Books", href: "/dashboard/books", icon: BookOpenIcon},
    {name: "Add a media", href: "/dashboard/add-media", icon: PlusCircleIcon}
];

export default function NavLinks () {

    const linkColors: {[key: string]: {bg: string, icon: string, hover: string}} = {
        "Home": {bg: "bg-slate-100", icon: "text-slate-700", hover: "hover:bg-slate-200"},
        "Movies": {bg: "bg-blue-100", icon: "text-blue-600", hover: "hover:bg-blue-200"},
        "Series": {bg: "bg-purple-100", icon: "text-purple-600", hover: "hover:bg-purple-200"},
        "Books": {bg: "bg-amber-100", icon: "text-amber-600", hover: "hover:bg-amber-200"},
        "Add a media": {bg: "bg-green-100", icon: "text-green-600", hover: "hover:bg-green-200"}
    };

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const colors = linkColors[link.name];
                return (
                    <Link key={link.name} href={link.href} className={`flex h-12 ${colors.bg} grow items-center justify-center gap-2 rounded-lg font-semibold text-slate-900 ${colors.hover} transition-all shadow-md hover:shadow-lg active:scale-95 md:flex-none md:grow-0`}>
                        <LinkIcon className={`w-6 ${colors.icon}`} />
                        <p className="hidden md:block text-sm">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}