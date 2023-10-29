const express = require('express');
const router = express.Router(); // new instance of Router
const UsuarioController = require('./controllers/usuario')
/* GET home page */
router.get('/', (req, res) => {
    res.render('index', { mensaje: '¡Hola, EJS!' });
});
router.get('/usuarios', (req, res) => {
    UsuarioController.index(req, res);
});
module.exports = router; // You export the intance