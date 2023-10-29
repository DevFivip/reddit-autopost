var express = require('express');
var router = express.Router(); // new instance of Router

/* GET home page */
router.get('/', (req, res) => {
    res.render('index', { mensaje: '¡Hola, EJS!' });
});
module.exports = router; // You export the intance