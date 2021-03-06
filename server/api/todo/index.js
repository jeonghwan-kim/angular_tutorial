const express = require('express');
const router = express.Router();
const ctrl = require('./todo.ctrl.js');

router.get('/', ctrl.query);
router.delete('/:id', ctrl.destroy);
router.delete('/', ctrl.complete);
router.put('/:id', ctrl.update);
router.put('/:id/:title', ctrl.updateTitle);
router.post('/', ctrl.create);

module.exports = router;