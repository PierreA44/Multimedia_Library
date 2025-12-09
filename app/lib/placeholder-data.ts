import { Book, Movie, Serie, User } from "./definitions";

const users:User[] = [
    {
        id:"51",
        name: "La Blatte",
        email: "lablatte@mail.com",
        password: "123456",
    },
];

const movies:Movie[] = [
    {
        id:"1",
        title: "Men In Black",
        director: "Barry Sonnenfeld",
        year: 1997,
        duration: 98,
    },
    {
        id:"2",
        title: "La Mouche",
        director: "David Cronenberg",
        year: 1986,
        duration: 96,
    },
    {
        id:"3",
        title:"Inception",
        director: "Christopher Nolan",
        year: 2010,
        duration: 148,
    },
    {
        id:"4",
        title:"Dirty Dancing",
        director: "Emile Ardolino",
        year: 1987,
        duration: 100,
    },
    {
        id:"5",
        title: "Les Aventuriers de l'Arche Perdue",
        director: "Steven Spielberg",
        year:1981,
        duration: 115,
    },
    {
        id:"6",
        title: "La Famille Addams",
        director: "Barry Sonnenfeld",
        year: 1991,
        duration: 99,
    }
];

const series:Serie[] = [
    {
        id:"1",
        title: "Lost: Les Disparus",
        startYear: 2004,
        endYear: 2010,
        numberOfSeasons : 6,
    },
    {
        id:"2",
        title: "Stargate SG-1",
        startYear: 1997,
        endYear: 2007,
        numberOfSeasons:10,
    },
    {
        id:"3",
        title: "Charmed",
        startYear: 1998,
        endYear: 2006,
        numberOfSeasons: 8,
    },
    {
        id:"4",
        title: "Buffy contre les vampires",
        startYear: 1997,
        endYear: 2003,
        numberOfSeasons: 7,
    },
    {
        id:"5",
        title:"Le Seigneur des nneaux : Les Anneaux de pouvoir",
        startYear:2022,
        numberOfSeasons:2,
    }
];

const books:Book[] = [
    {
        id: "1",
        title: "L'étranger",
        author: "Albert Camus",
        originalPublishing: 1942,
        genre : "roman",
    },
    {
        id: "2",
        title: "Harry Potter à l'école des sorciers",
        author: "J.K. Rowling",
        originalPublishing: 1997,
        genre: "roman",
    },
    {
        id:"3",
        title: "La Cantatrice chauve",
        author: "Eugène Ionesco",
        originalPublishing: 1950,
        genre: "théâtre",
    },
    {
        id:"4",
        title: "Les Fleurs du Mal",
        author: "Charles Baudelaire",
        originalPublishing: 1857,
        genre: "poésie",
    },
    {
        id: "5",
        title: "Le Capital",
        author: "Karl Marx",
        originalPublishing: 1867,
        genre: "essai",
    }
]

export { users, movies , series , books};