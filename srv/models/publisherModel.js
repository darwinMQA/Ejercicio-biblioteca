const db = require('../config/db');

const Publisher = {
  // Obtener todas las editoriales
  getAll: (callback) => {
    const query = `SELECT id, name FROM publisher`;
    db.exec(query, (err, result) => callback(err, result));
  },

  // Obtener una editorial por ID
  getById: (id, callback) => {
    const query = `SELECT id, name FROM publisher WHERE id = ?`;
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec([id], (err2, result) => callback(err2, result));
    });
  },

  // Crear una editorial
  create: (data, callback) => {
    const query = `INSERT INTO publisher (id, name) VALUES (?, ?)`;
    const values = [data.id, data.name];
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec(values, (err2, result) => callback(err2, result));
    });
  },

  // Actualizar una editorial
  update: (id, data, callback) => {
    const query = `UPDATE publisher SET name = ? WHERE id = ?`;
    const values = [data.name, id];
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec(values, (err2, result) => callback(err2, result));
    });
  },

  // Eliminar una editorial
  delete: (id, callback) => {
    const query = `DELETE FROM publisher WHERE id = ?`;
    db.prepare(query, (err, statement) => {
      if (err) return callback(err);
      statement.exec([id], (err2, result) => callback(err2, result));
    });
  }
};

module.exports = Publisher;
