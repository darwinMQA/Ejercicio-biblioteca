const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');

// Obtener todas las editoriales
router.get('/', publisherController.getPublisher);

// Agregar una nueva editorial
router.post('/', publisherController.addPublisher);

// Actualizar una editorial
router.put('/:id', publisherController.updatePublisher);

// Eliminar una editorial
router.delete('/:id', publisherController.deletePublisher);

module.exports = router;
