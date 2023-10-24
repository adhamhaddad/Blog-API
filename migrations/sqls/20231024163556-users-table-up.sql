CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uuid uuid uuid_generate_v4() UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT timezone('UTC', now()),
    updated_at TIMESTAMP DEFAULT timezone('UTC', now()),
    deleted_at TIMESTAMP
);