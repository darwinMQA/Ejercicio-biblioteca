const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', genreController.getGenre);
router.post('/', genreController.addGenre);
router.delete('/:id', genreController.deleteGenre);
router.put('/:id', genreController.updateGenre); 

module.exports = router;
