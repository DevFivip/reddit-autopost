const express = require('express');
const multer = require('multer');
const router = express.Router(); // new instance of Router
const UsuarioController = require('./controllers/usuario')
const GalleryController = require('./controllers/gallery')
const path = require('path');

// Configurar Multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: __dirname+'/../files/', // Carpeta donde se guardarán los archivos
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo con marca de tiempo
    }
});

const upload = multer({ storage });
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

router.get('/gallery', (req, res) => {
    GalleryController.index(req, res);
});
router.get('/gallery/create', (req, res) => {
    GalleryController.create(req, res);
});
router.post('/gallery', upload.array('fileInput'), (req, res) => {
    GalleryController.store(req, res);
    // res.redirect('/gallery');
});
router.get('/gallery/:imagen_id', (req, res) => {
    GalleryController.show(req, res);
});





module.exports = router; // You export the intance