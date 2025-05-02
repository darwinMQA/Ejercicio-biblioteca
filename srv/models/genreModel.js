const db = require('../config/db');

const Genre = {
  getAll: (callback) => {
    const query = `
      SELECT 
        g.id, g.genre
      FROM genre g
    `;
    db.exec(query, (err, result) => callback(err, result));
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO genre (id, genre)
      VALUES (?, ?)
    `;
    const values = [data.id, data.genre];
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec(values, (err2, result) => callback(err2, result));
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM genre WHERE id = ?`;
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec([id], (err2, result) => callback(err2, result));
    });
  }
};

module.exports = Genre;
