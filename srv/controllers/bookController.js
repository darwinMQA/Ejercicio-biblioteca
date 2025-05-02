const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  Book.getAll((err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.json(result);
  });
};

exports.getBookById = (req, res) => {
  const id = req.params.id;
  Book.getById(id, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    if (!result || result.length === 0) {
      return res.status(404).send('Libro no encontrado');
    }
    res.json(result);
  });
};

exports.addBook = (req, res) => {
  const data = req.body;

  // Validación de datos
  if (!data.title || !data.rating || !data.total_pages || !data.published_date || !data.genre_id || !data.authors_id) {
    return res.status(400).send('Faltan datos obligatorios');
  }

  Book.create(data, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.status(201).send('Libro agregado correctamente');
  });
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  // Validación de datos
  if (!data.title || !data.rating || !data.total_pages || !data.published_date || !data.genre_id || !data.authors_id) {
    return res.status(400).send('Faltan datos obligatorios');
  }

  Book.update(id, data, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.send('Libro actualizado correctamente');
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  Book.delete(id, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    if (result.affectedRows === 0) {
      return res.status(404).send('Libro no encontrado');
    }
    res.status(204).end();
  });
};

