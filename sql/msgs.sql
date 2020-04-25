DROP TABLE IF EXISTS msgs;
CREATE TABLE msgs (
    id SERIAL primary key,
    uid INT not null,
    msg VARCHAR(1000) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
