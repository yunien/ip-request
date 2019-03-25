const express = require('express');
const controller = require('./indexController');

const router = express.Router();

router.get('/', controller.index);
router.get('/html', controller.html);

module.exports = router;