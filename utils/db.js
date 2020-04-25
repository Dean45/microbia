var spicedPg = require('spiced-pg');
var db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/social');

exports.reg = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users(first, last, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
        [first || null, last || null, email || null, password || null])
        .then(({ rows }) => {
            return rows;});
};

exports.passCheck = email => {
    return db.query(
        `SELECT password, id FROM users WHERE email = $1`, [email])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getInfo = uid => {
    return db.query(
        `SELECT id, first, last, prourl, bio FROM users WHERE id = $1`, [uid])
        .then(({ rows }) => {
            return rows;
        });
};

exports.sndProPic = function(uid, prourl) {
    return db.query(
        `UPDATE users SET prourl = $2
      WHERE id = $1
      RETURNING prourl`, [uid, prourl])
        .then(({ rows }) => {
            return rows;
        });
};

exports.sndBio = function(uid, bio) {
    return db.query(
        `UPDATE users SET bio = $2
      WHERE id = $1
      RETURNING bio`, [uid, bio])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getNine = () => {
    return db.query(
        `SELECT id, first, last, prourl FROM users
        ORDER BY id DESC
        LIMIT 8`)
        .then(({ rows }) => {
            return rows;
        });
};

exports.getMatch = (input) => {
    return db.query(
        `SELECT id, first, last, prourl FROM users
        WHERE first ILIKE $1
        LIMIT 8`, [input + "%"])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getStatus = function(sid, rid) {
    return db.query(
        `SELECT sid, rid, acc FROM friends
        WHERE (rid = $1 AND sid = $2)
        OR (rid = $2 AND sid = $1)`, [sid, rid])
        .then(({ rows }) => {
            return rows;
        });
};

exports.addFr = function(sid, rid) {
    return db.query(
        `INSERT INTO friends (sid, rid)
      VALUES ($1, $2)`, [sid, rid]);
};

exports.delFr = function(sid, rid) {
    return db.query(
        `DELETE FROM friends
      WHERE (sid = $1 AND rid = $2)
      OR (sid = $2 AND rid = $1)`, [sid, rid]);
};

exports.accFr = function(sid, rid) {
    return db.query(
        `UPDATE friends SET acc=true
      WHERE (sid = $2 AND rid = $1)`, [sid, rid]);
};

exports.getFrieee = id => {
    return db.query(
        `SELECT users.id, users.first, users.last, users.prourl, friends.acc FROM friends
      JOIN users
      ON (acc = false AND rid = $1 AND sid = users.id)
      OR (acc = true AND rid = $1 AND sid = users.id)
      OR (acc = true AND sid = $1 AND rid = users.id)`, [id])
        .then(({ rows }) => {
            return rows;});
};

exports.getTwenty = () => {
    return db.query(
        `SELECT users.id, users.first, users.last, users.prourl, msgs.msg, msgs.created_at FROM users
      JOIN msgs ON users.id = msgs.uid
      ORDER BY msgs.created_at DESC
      LIMIT 20`)
        .then(({ rows }) => {
            return rows;});
};

exports.sendOne = function(uid, msg) {
    return db.query(
        `INSERT INTO msgs (uid, msg)
      VALUES ($1, $2)
      RETURNING msg, created_at`, [uid || null, msg || null])
        .then(({ rows }) => {
            return rows;});
};
