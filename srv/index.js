const express = require('express');
const cors = require('cors');
const app = express();
const booksRoutes = require('./routes/bookRoutes');
const authorsRoutes = require('./routes/authorRoutes');
const genreRoutes = require('./routes/genreRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta base
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/publishers', publisherRoutes);

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
