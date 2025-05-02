const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAuthor);
router.post('/', authorController.addAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.put('/:id', authorController.updateAuthor); 

module.exports = router;
