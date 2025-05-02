const db = require('../config/db');

const Author = {
  getAll: (callback) => {
    const query = `
      SELECT 
        a.id, a.name, a.surname,
      FROM authors a
    `;
    db.exec(query, (err, result) => callback(err, result));
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO authors (id, name, surname)
      VALUES (?, ?, ?)
    `;
    const values = [data.id, data.name, data.surname];
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec(values, (err2, result) => callback(err2, result));
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM authors WHERE id = ?`;
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec([id], (err2, result) => callback(err2, result));
    });
  }
};

module.exports = Author;
