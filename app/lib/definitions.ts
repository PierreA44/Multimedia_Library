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
    id: number;
    title: string;
    director: string;
    year: number;
    duration: number | null;
    category: "movie";
    librarie_id: number;
    notation?: number,
    comment?: string
};

export type Serie = {
    id: number;
    title: string;
    start_year: number;
    end_year: number | null;
    seasons: number;
    category: "serie"
    librarie_id: number;
    notation?: number,
    comment?: string
};

export type Book = {
    id: number;
    title: string;
    author: string;
    original_publishing: number | null;
    genre: "roman" | "nouvelle" | "conte" | "biographie" | "théâtre" | "poésie" | "essai";
    category: "book";
    librarie_id: number;
    notation?: number,
    comment?: string
};

export type Comment = {
    id: string;
    text: string;
    userId: string;
    multimediaId: string;
}