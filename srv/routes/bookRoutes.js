const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.getBooks);
router.post('/', BookController.AddBook);
router.delete('/:id', BookController.deleteBook);
router.put('/:id', BookController.updateBook); 

module.exports = router;
