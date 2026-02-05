export type User = {
    name: string;
    email: string;
    password: string;
};

export type Media = {
    id: number;
    title: string;
    category: "movie" | "serie" | "book";
    director: string;
    year: number;
    duration: number | null;
    start_year: number;
    author: string;
    original_publishing: number | null;
    email: string;
}

export type Movie = {
    id: string;
    title: string;
    director: string;
    year: number;
    duration: number | null;
};

export type Serie = {
    id: string;
    title: string;
    start_year: number;
    end_year: number | null;
    seasons: number;
};

export type Book = {
    id: string;
    title: string;
    author: string;
    original_publishing: number | null;
    genre: "roman" | "nouvelle" | "conte" | "biographie" | "théâtre" | "poésie" | "essai";
};

export type Comment = {
    id: string,
    text: string,
    userId: string,
    multimediaId: string,
}