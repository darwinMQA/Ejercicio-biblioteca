const db = require('../config/db');

// Obtener todas las editoriales
exports.getPublisher = (req, res) => {
  const query = 'SELECT * FROM PUBLISHER';
  db.exec(query, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.json(result);
  });
};

// Agregar una nueva editorial
exports.addPublisher = (req, res) => {
  const { name } = req.body;

  // Verificar que 'name' está en el cuerpo de la solicitud
  if (!name) {
    console.error("Faltando el nombre de la editorial.");
    return res.status(400).send('Faltando nombre de la editorial');
  }

  const query = `
    INSERT INTO PUBLISHER 
    (name)
    VALUES (?)`;

  const stmt = db.prepare(query);

  stmt.exec([name], (err) => {
    if (err) {
      console.error('Error al agregar editorial:', err);
      return res.status(500).send(err.toString());
    }
    res.status(201).send('Editorial agregada correctamente');
    stmt.drop();
  });
};


// Eliminar una editorial
exports.deletePublisher = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM PUBLISHER WHERE ID = ?';
  const stmt = db.prepare(query);

  stmt.exec([id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.status(204).end();
    stmt.drop();
  });
};

// Actualizar una editorial
exports.updatePublisher = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const query = `
    UPDATE PUBLISHER
    SET name = ?
    WHERE id = ?`;

  const stmt = db.prepare(query);

  stmt.exec([name, id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.send('Editorial actualizada');
    stmt.drop();
  });
};
