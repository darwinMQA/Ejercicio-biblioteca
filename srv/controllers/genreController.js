const db = require('../config/db');

// Obtener generos
exports.getGenre = (req, res) => {
  const query = 'SELECT * FROM GENRE';
  db.exec(query, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.json(result);
  });
};

// Agregar genero
exports.addGenre = (req, res) => {
  const {
    genre
  } = req.body;

  const query = `
    INSERT INTO genre 
    (genre)
    VALUES (?)`;

  const stmt = db.prepare(query);

  stmt.exec([genre], (err) => {
    if (err) {
      console.error('Error al agregar genero:', err);
      return res.status(500).send(err.toString());
    }
    res.status(201).send('Genero agregado correctamente');
    stmt.drop();
  });
};


// Eliminar genero
exports.deleteGenre = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM GENRE WHERE ID = ?';
  const stmt = db.prepare(query);

  stmt.exec([id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.status(204).end();
    stmt.drop();
  });
};


// Actualizar libro
exports.updateGenre = (req, res) => {
  const id = req.params.id;
  const {
    genre
  } = req.body;

  const query = `
    UPDATE GENRE
    SET genre = ?
    WHERE id = ?`;

  const stmt = db.prepare(query);

  stmt.exec([genre, id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.send('Genero actualizado');
    stmt.drop();
  });
};

