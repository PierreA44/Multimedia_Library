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
        id: 1,
        title: "Men In Black",
        director: "Barry Sonnenfeld",
        year: 1997,
        duration: 98,
        category: "movie",
        librarie_id: 0,
    },
    {
        id: 2,
        title: "La Mouche",
        director: "David Cronenberg",
        year: 1986,
        duration: 96,
        category: "movie",
        librarie_id: 0,
    },
    {
        id: 3,
        title:"Inception",
        director: "Christopher Nolan",
        year: 2010,
        duration: 148,
        category: "movie",
        librarie_id: 0,
    },
    {
        id: 4,
        title:"Dirty Dancing",
        director: "Emile Ardolino",
        year: 1987,
        duration: 100,
        category: "movie",
        librarie_id: 0,
    },
    {
        id: 5,
        title: "Les Aventuriers de l'Arche Perdue",
        director: "Steven Spielberg",
        year:1981,
        duration: 115,
        category: "movie",
        librarie_id: 0,
    },
    {
        id: 6,
        title: "La Famille Addams",
        director: "Barry Sonnenfeld",
        year: 1991,
        duration: 99,
        category: "movie",
        librarie_id: 0,
    }
];

const series:Serie[] = [
    {
        id: 15,
        title: "Lost: Les Disparus",
        start_year: 2004,
        end_year: 2010,
        seasons : 6,
        category: "serie",
        librarie_id: 0,
    },
    {
        id: 16,
        title: "Stargate SG-1",
        start_year: 1997,
        end_year: 2007,
        seasons:10,
        category: "serie",
        librarie_id: 0,
    },
    {
        id: 17,
        title: "Charmed",
        start_year: 1998,
        end_year: 2006,
        seasons: 8,
        category: "serie",
        librarie_id: 0,
    },
    {
        id: 18,
        title: "Buffy contre les vampires",
        start_year: 1997,
        end_year: 2003,
        seasons: 7,
        category: "serie",
        librarie_id: 0,
    },
    {
        id: 19,
        title:"Le Seigneur des anneaux : Les Anneaux de pouvoir",
        start_year:2022,
        end_year: null,
        seasons:2,
        category: "serie",
        librarie_id: 0,
    }
];

const books:Book[] = [
    {
        id: 20,
        title: "L'étranger",
        author: "Albert Camus",
        original_publishing: 1942,
        genre : "roman",
        category: "book",
        librarie_id: 0,
    },
    {
        id: 21,
        title: "Harry Potter à l'école des sorciers",
        author: "J.K. Rowling",
        original_publishing: 1997,
        genre: "roman",
        category: "book",
        librarie_id: 0,
    },
    {
        id: 22,
        title: "La Cantatrice chauve",
        author: "Eugène Ionesco",
        original_publishing: 1950,
        genre: "théâtre",
        category: "book",
        librarie_id: 0,
    },
    {
        id: 23,
        title: "Les Fleurs du Mal",
        author: "Charles Baudelaire",
        original_publishing: 1857,
        genre: "poésie",
        category: "book",
        librarie_id: 0,
    },
    {
        id: 24,
        title: "Le Capital",
        author: "Karl Marx",
        original_publishing: 1867,
        genre: "essai",
        category: "book",
        librarie_id: 0,
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