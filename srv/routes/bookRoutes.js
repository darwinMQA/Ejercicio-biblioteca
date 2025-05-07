const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.delete('/:id', bookController.deleteBook);
router.put('/:id', bookController.updateBook); 

module.exports = router;
