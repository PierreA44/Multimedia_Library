export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Movie = {
    id: string;
    title: string;
    director: string;
    year: number;
    duration?: number;
};

export type Serie = {
    id: string;
    title: string;
    startYear: number;
    endYear?: number;
    numberOfSeasons: number;
};

export type Book = {
    id: string;
    title: string;
    author: string;
    originalPublishing?: number;
    genre: "roman" | "nouvelle" | "conte" | "biographie" | "théâtre" | "poésie" | "essai";
};