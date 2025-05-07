const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');

router.get('/', publisherController.getPublisher);
router.post('/', publisherController.addPublisher);
router.delete('/:id', publisherController.deletePublisher);
router.put('/:id', publisherController.updatePublisher); 

module.exports = router;
