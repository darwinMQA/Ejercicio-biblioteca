// models/BookModel.js
const db = require('../config/db'); 

module.exports = {
  getAll: async () => {
    const sql = `
      SELECT 
        b.id, b.title, b.rating, b.total_pages, b.published_date,
        g.genre, a.name AS author_name, a.surname AS author_surname
      FROM books b
      JOIN genre g ON b.genre_id = g.id
      JOIN authors a ON b.authors_id = a.id
    `;
    const result = await db.execute(sql);
    return result;
  },

  getById: async (id) => {
    const sql = `SELECT * FROM books WHERE id = ?`;
    const result = await db.execute(sql, [id]);
    return result[0];
  },

  create: async (data) => {
    const sql = `INSERT INTO books (id, title, rating, total_pages, published_date, genre_id, authors_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await db.execute(sql, [data.id, data.title, data.rating, data.total_pages, data.published_date, data.genre_id, data.authors_id]);
  },

  update: async (id, data) => {
    const sql = `UPDATE books SET title = ?, rating = ?, total_pages = ?, published_date = ?, genre_id = ?, authors_id = ?
                 WHERE id = ?`;
    await db.execute(sql, [data.title, data.rating, data.total_pages, data.published_date, data.genre_id, data.authors_id, id]);
  },

  delete: async (id) => {
    const sql = `DELETE FROM books WHERE id = ?`;
    await db.execute(sql, [id]);
  }
};
