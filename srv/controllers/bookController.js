const db = require('../config/db');

// Obtener libros
exports.getBooks = (req, res) => {
  const query = 'SELECT b.id, b.title, b.rating, b.total_pages, b.published_date, g.id AS genre_id, g.genre AS genre, a.id AS author_id, a.name AS author_name, a.surname AS author_surname, p.id As publisher_id, p.name AS publisher_name FROM books b JOIN genre g ON b.genre_id = g.id JOIN authors a ON b.authors_id = a.id JOIN publisher p ON b.publisher_id = p.id';
  db.exec(query, (err, result) => {
    if (err) return res.status(500).send(err.toString());
    res.json(result);
  });
};

// Agregar libro
exports.AddBook = (req, res) => {
  const {
    title,
    rating,
    total_pages,
    published_date,
    genre_id,
    authors_id,
    publisher_id
  } = req.body;

  console.log("Datos recibidos del frontend:", req.body);

  const query = `
    INSERT INTO books 
    (title, rating, total_pages, published_date, genre_id, authors_id, publisher_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const stmt = db.prepare(query);

  stmt.exec([title, rating, total_pages, published_date, genre_id, authors_id, publisher_id], (err) => {
    if (err) {
      console.error('Error al agregar libro:', err);
      return res.status(500).send(err.toString());
    }
    res.status(201).send('Libro agregado correctamente');
    stmt.drop();
  });
};


// Eliminar libro
exports.deleteBook = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM BOOKS WHERE ID = ?';
  const stmt = db.prepare(query);

  stmt.exec([id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.status(204).end();
    stmt.drop();
  });
};


// Actualizar libro
exports.updateBook = (req, res) => {
  const id = req.params.id;
  const {
    title,
    rating,
    total_pages,
    published_date,
    genre_id,
    authors_id,
    publisher_id
  } = req.body;

  const query = `
    UPDATE BOOKS
    SET title = ?, rating = ?, total_pages = ?, published_date = ?, genre_id = ?, authors_id = ?, publisher_id = ?
    WHERE id = ?`;

  const stmt = db.prepare(query);

  stmt.exec([title, rating, total_pages, published_date, genre_id, authors_id, publisher_id, id], (err) => {
    if (err) return res.status(500).send(err.toString());
    res.send('Libro actualizado');
    stmt.drop();
  });
};
