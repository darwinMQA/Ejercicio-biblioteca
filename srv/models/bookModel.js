const db = require('../config/db');

const Book = {
  getAll: (callback) => {
    const query = `
    SELECT 
      b.id, b.title, b.rating, b.total_pages, b.published_date,
      g.name AS genre, a.name AS author_name, a.surname AS author_surname
    FROM books b
    JOIN genre g ON b.genre_id = g.id
    JOIN authors a ON b.authors_id = a.id
  `;
    db.exec(query, (err, result) => callback(err, result));
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO books ( title, rating, total_pages, published_date, genre_id, authors_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ data.title, data.rating, data.total_pages, data.published_date, data.genre_id, data.authors_id];
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec(values, (err2, result) => callback(err2, result));
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM books WHERE id = ?`;
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec([id], (err2, result) => callback(err2, result));
    });
  }
};

module.exports = Book;
