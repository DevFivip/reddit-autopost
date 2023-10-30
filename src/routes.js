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
router.get('/usuarios/create', (req, res) => {
    UsuarioController.create(req, res);
});
router.post('/usuarios', (req, res) => {
    UsuarioController.store(req, res);
});
router.get('/usuarios/:usuario_id', (req, res) => {
    UsuarioController.show(req, res);
});
router.post('/usuarios/:usuario_id', (req, res) => {
    UsuarioController.update(req, res);
});
router.get('/usuarios/status/:usuario_id', (req, res) => {
    UsuarioController.status(req, res);
});
router.delete('/usuarios/:usuario_id', (req, res) => {
    UsuarioController.remove(req, res);
});

module.exports = router; // You export the intance