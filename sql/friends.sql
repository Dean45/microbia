DROP TABLE IF EXISTS friends;
CREATE TABLE friends(
  id SERIAL PRIMARY KEY,
  sid INT NOT NULL REFERENCES users(id),
  rid INT NOT NULL REFERENCES users(id),
  acc BOOLEAN DEFAULT FALSE
);
