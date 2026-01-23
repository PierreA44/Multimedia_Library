CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS medias (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    category VARCHAR(15),
    director VARCHAR(100),
    year INTEGER,
    duration INTEGER,
    start_year INTEGER,
    end_year INTEGER,
    seasons INTEGER,
    author VARCHAR(150),
    original_publishing INTEGER,
    genre VARCHAR(15)
);

CREATE TABLE library (
    id SERIAL PRIMARY KEY,
    user_id INT,
    media_id INT,
    date TIMESTAMP,
    comment TEXT,
    notation INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (media_id) REFERENCES medias (id)
);