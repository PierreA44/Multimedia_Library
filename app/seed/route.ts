import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, movies, series, books, comments } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

async function seedUsers() {

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (name, email, password)
                VALUES (${user.name}, ${user.email}, ${hashedPassword})
                ;
                `;
        })
    );

    return insertedUsers;
};

async function seedMovies() {

    const insertedMovies = await Promise.all(
        movies.map(
            (movie) => sql`
                INSERT INTO medias (title, category, director, year, duration)
                VALUES (${movie.title}, 'movie', ${movie.director}, ${movie.year}, ${movie.duration});
            `,
        ),
    );

    return insertedMovies;
};





async function seedSeries() {

    const insertedSeries = await Promise.all(
        series.map(
            (serie) => sql`
                INSERT INTO medias (title, category, start_year, end_year, seasons)
                VALUES ( ${serie.title}, 'serie', ${serie.start_year}, ${serie.end_year}, ${serie.seasons})
                ;
                `
        ),
    );

    return insertedSeries;
};

async function seedBooks() {

    const insertedBooks = await Promise.all(
        books.map(
            (book) => sql`
                    INSERT INTO medias (title, category, author, original_publishing, genre)
                    VALUES (${book.title}, 'book', ${book.author}, ${book.original_publishing}, ${book.genre})
                    ;
                    `            
        ),
    );

    return insertedBooks;

};

async function seedComments() {

    await sql`
        CREATE TABLE IF NOT EXISTS comments (
        id SERIAL,
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
                INSERT INTO comments (comment, notation, user_id, multimedia_id, date)
                VALUES (${comment.text}, 5, ${comment.userId}, ${comment.multimediaId}, CURRENT_TIMESTAMP)
                ;
                `
        )
    );

    return insertedComments

    
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers(),
            seedMovies(),
            seedSeries(),
            seedBooks(),
            seedComments(),
        ]);

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        return Response.json({error}, { status: 500 })
    }
}