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
    duration?: number | null;
};

export type Serie = {
    id: string;
    title: string;
    startYear: number;
    endYear?: number | null;
    numberOfSeasons: number;
};

export type Book = {
    id: string;
    title: string;
    author: string;
    originalPublishing?: number | null;
    genre: "roman" | "nouvelle" | "conte" | "biographie" | "théâtre" | "poésie" | "essai";
};

export type Comment = {
    id: string,
    text: string,
    userId: string,
    multimediaId: string,
}