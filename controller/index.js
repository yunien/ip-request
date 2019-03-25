const express = require('express');
const controller = require('./indexController');

const router = express.Router();

router.get('/test', controller.text);
// app.get('/', (req, res) => res.send('hello, Dcard.'))

module.exports = router;