import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, movies, series, books, comments } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

async function seedUsers() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        )
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
                `;
        })
    );

    return insertedUsers;
};

async function seedMovies() {

    await sql`
        CREATE TABLE IF NOT EXISTS movies (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        director VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        duration INTEGER,
        date TIMESTAMP
        )
    `;

    const insertedMovies = await Promise.all(
        movies.map(
            (movie) => {
                if(!movie?.duration) movie.duration = null;
                sql(`
                INSERT INTO movies (id, title, director, year, duration, date)
                VALUES (${movie.id}, ${movie.title}, ${movie.director}, ${movie.year}, ${movie.duration}, CURRENT_TIMESTAMP)
                ON CONFLICT (id) DO NOTHING;
            `)},
        ),
    );

    return insertedMovies;
};

async function seedSeries() {

    await sql`
        CREATE TABLE IF NOT EXISTS series (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        startYear INTEGER NOT NULL,
        endYear INTEGER,
        genre INTEGER NOT NULL,
        date TIMESTAMP
        )
    `;

    const insertedSeries = await Promise.all(
        series.map(
            (serie) => {
                if(!serie?.endYear) {
                    serie.endYear = null
                };
                sql(`
                INSERT INTO series (id, title, startYear, endYear, numberOfSeasons, date)
                VALUES (${serie.id}, ${serie.title}, ${serie.startYear}, ${serie.endYear}, CURRENT_TIMESTAMP)
                ON CONFLICT (id) DO NOTHING;
                `)}
        ),
    );

    return insertedSeries;
};

async function seedBooks() {

    await sql`
        CREATE TABLE IF NOT EXISTS books (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(150) NOT NULL,
        originalPublishing INTEGER,
        genre VARCHAR(15) NOT NULL,
        date TIMESTAMP
        )
    `;

    const insertedBooks = await Promise.all(
        books.map(
            (book) => {
                if(!book?.originalPublishing) {
                    book.originalPublishing = null};
                sql(`
                    INSERT INTO books (id, title, author, originalPublishing, genre, date)
                    VALUES (${book.id}, ${book.title}, ${book.author}, ${book.originalPublishing}, CURRENT_TIMESTAMP)
                    ON CONFLICT (id) DO NOTHING;
                    `);
            },
        ),
    );

    return insertedBooks;

};

async function seedComments() {

    await sql`
        CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(15) NOT NULL PRIMARY KEY,
        comment TEXT NOT NULL,
        notation INTEGER NOT NULL,
        user_id VARCHAR(15),
        multimedia_id VARCHAR(15),
        date TIMESTAMP
        )
    `;

    const insertedComments = await Promise.all(
        comments.map(
            (comment) => 
                sql`
                INSERT INTO comments (id, comment, notation, user_id, multimedia_id, date)
                VALUES (${comment.id}, ${comment.text}, 5, ${comment.userId}, ${comment.multimediaId}, CURRENT_TIMESTAMP)
                ON CONFLICT (id) DO NOTHING;
                `
        )
    );

    return insertedComments

    
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            //seedUsers(),
            seedMovies(),
            //seedSeries(),
            //seedBooks(),
            //seedComments(),
        ]);

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        return Response.json({error}, { status: 500 })
    }
}