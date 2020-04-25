DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL primary key,
    first VARCHAR(255) not null,
    last VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(255) not null,
    prourl VARCHAR(355),
    bio VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
