import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, movies, series, books } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-pssp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
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
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE IS NOT EXISTS movies (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        director VARCHAR(100) NOT NULL,
        year YEAR NOT NULL,
        duration INTEGER NULLABLE,
        date TIMESTAMP
        );
    `;

    const insertedMovies = await Promise.all(
        movies.map(
            (movie) => sql`
                INSERT INTO movies (id, title, director, year, duration, date)
                VALUES (${movie.id}, ${movie.title}, ${movie.director}, ${movie.year}, ${movie?.duration}, CURRENT_TIMESTAMP())
                ON CONFLICT (id) DO NOTHING;
            `,
        ),
    );

    return insertedMovies;
};

async function seedSeries() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE IF NOT EXISTS series (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        startYear YEAR NOT NULL,
        endYear YEAR NULLABLE,
        genre INTEGER NOT NULL,
        date TIMESTAMP
        );
    `;

    const insertedSeries = await Promise.all(
        series.map(
            (serie) => sql`
                INSERT INTO series (id, title, startYear, endYear, numberOfSeasons, date)
                VALUES (${serie.id}, ${serie.title}, ${serie.startYear}, ${serie.endYear}, CURRENT_TIMESTAMP())
                ON CONFLICT (id) DO NOTHING;
                `,
        ),
    );

    return insertedSeries;
};

async function seedBooks() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE IF NOT EXISTS books (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(150) NOT NULL,
        originalPublishing YEAR NULLABLE,
        genre VARCHAR(15) NOT NULL,
        date TIMESTAMP
        );
    `;

    const insertedBooks = await Promise.all(
        books.map(
            (book) => sql`
                INSERT INTO books (id, title, author, originalPublishing, genre, date)
                VALUES (${book.id}, ${book.title}, ${book.author}, ${book.originalPublishing}, CURRENT_TIMESTAMP())
                ON CONFLICT (id) DO NOTHING;
                `,
        ),
    );

    return insertedBooks;

};

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers(),
            seedMovies(),
            seedSeries(),
            seedBooks(),
        ]);

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        return Response.json({error}, { status: 500 })
    }
}