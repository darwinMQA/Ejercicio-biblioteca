const db = require('../config/db');

// Obtener autores
exports.getAuthor = (req, res) => {
  const query = 'SELECT * FROM AUTHORS';
  db.exec(query, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.json(result);
  });
};

// Agregar autor
exports.addAuthor = (req, res) => {
  const {
    name,
    surname
  } = req.body;

  const query = `
    INSERT INTO authors 
    (name, surname)
    VALUES (?, ?)`;

  const stmt = db.prepare(query);

  stmt.exec([name, surname], (err) => {
    if (err) {
      console.error('Error al agregar autor:', err);
      return res.status(500).send(err.toString());
    }
    res.status(201).send('Autor agregado correctamente');
    stmt.drop();
  });
};


// Eliminar autor
exports.deleteAuthor = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM AUTHORS WHERE ID = ?';
  const stmt = db.prepare(query);

  stmt.exec([id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.status(204).end();
    stmt.drop();
  });
};


// Actualizar libro
exports.updateAuthor = (req, res) => {
  const id = req.params.id;
  const {
    name,
    surname
  } = req.body;

  const query = `
    UPDATE AUTHORS
    SET name = ?, surname = ?
    WHERE id = ?`;

  const stmt = db.prepare(query);

  stmt.exec([name, surname, id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.send('Autor actualizado');
    stmt.drop();
  });
};

