import { Book, Comment, Movie, Serie, User } from "./definitions";

const users:User[] = [
    {
        name: "La Blatte",
        email: "lablatte@mail.com",
        password: "123456",
    },
    {
        name: "Le Chacal",
        email: "lechacal@mail.com",
        password: "123456"
    }
];

const movies:Movie[] = [
    {
        id:"m1",
        title: "Men In Black",
        director: "Barry Sonnenfeld",
        year: 1997,
        duration: 98,
    },
    {
        id:"m2",
        title: "La Mouche",
        director: "David Cronenberg",
        year: 1986,
        duration: 96,
    },
    {
        id:"m3",
        title:"Inception",
        director: "Christopher Nolan",
        year: 2010,
        duration: 148,
    },
    {
        id:"m4",
        title:"Dirty Dancing",
        director: "Emile Ardolino",
        year: 1987,
        duration: 100,
    },
    {
        id:"m5",
        title: "Les Aventuriers de l'Arche Perdue",
        director: "Steven Spielberg",
        year:1981,
        duration: 115,
    },
    {
        id:"m6",
        title: "La Famille Addams",
        director: "Barry Sonnenfeld",
        year: 1991,
        duration: 99,
    }
];

const series:Serie[] = [
    {
        id:"s1",
        title: "Lost: Les Disparus",
        start_year: 2004,
        end_year: 2010,
        seasons : 6,
    },
    {
        id:"s2",
        title: "Stargate SG-1",
        start_year: 1997,
        end_year: 2007,
        seasons:10,
    },
    {
        id:"s3",
        title: "Charmed",
        start_year: 1998,
        end_year: 2006,
        seasons: 8,
    },
    {
        id:"s4",
        title: "Buffy contre les vampires",
        start_year: 1997,
        end_year: 2003,
        seasons: 7,
    },
    {
        id:"s5",
        title:"Le Seigneur des anneaux : Les Anneaux de pouvoir",
        start_year:2022,
        end_year: null,
        seasons:2,
    }
];

const books:Book[] = [
    {
        id: "b1",
        title: "L'étranger",
        author: "Albert Camus",
        original_publishing: 1942,
        genre : "roman",
    },
    {
        id: "b2",
        title: "Harry Potter à l'école des sorciers",
        author: "J.K. Rowling",
        original_publishing: 1997,
        genre: "roman",
    },
    {
        id:"b3",
        title: "La Cantatrice chauve",
        author: "Eugène Ionesco",
        original_publishing: 1950,
        genre: "théâtre",
    },
    {
        id:"b4",
        title: "Les Fleurs du Mal",
        author: "Charles Baudelaire",
        original_publishing: 1857,
        genre: "poésie",
    },
    {
        id: "b5",
        title: "Le Capital",
        author: "Karl Marx",
        original_publishing: 1867,
        genre: "essai",
    }
];

const comments: Comment[] = [
    {
        id: "c1",
        text:"Eh l'ami ! Qu'est-ce que tu as l'intention de faire au juste ?",
        userId: "u51",
        multimediaId: "m1",
    },
    {
        id: "c2",
        text:"A bas le cirage !",
        userId: "u51",
        multimediaId: "b3",
    },
    {
        id: "c3",
        text:"Jaffa Cri !",
        userId: "u51",
        multimediaId: "s2",
    }
]

export { users, movies , series , books, comments};