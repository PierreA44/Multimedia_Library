"use client";

import { BookOpenIcon, FilmIcon, HomeIcon, TvIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const links = [
    {name: "Home", href: "/dashboard", icon: HomeIcon},
    {name: "Movies", href: "/dashboard/movies", icon: FilmIcon},
    {name: "Series", href: "/dashboard/series", icon: TvIcon},
    {name: "Books", href: "/dashboard/books", icon: BookOpenIcon}
];

export default function NavLinks () {

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link key={link.name} href={link.href} className="flex h-12 bg-amber-700 grow items-center justify-center gap-2 rounded-md hover:bg-amber-800">
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}