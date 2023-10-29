// db = require(__dirname + '/database/conection');
// db.serialize(function () {
//     const stmt = db.prepare('INSERT INTO usuarios (nombre) VALUES (?)');
//     stmt.run('Juan');
//     stmt.run('María');
//     stmt.run('Pedro');
//     stmt.finalize();
// });
// db.close();

const express = require('express');
const app = express();
const routes = require('./routes');
//var routes = require('./routes') --> this works 
// ...
app.use('/', routes);
const port = 3000;

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

// // Ruta de inicio
// app.get('/', (req, res) => {
//     res.render('index', { mensaje: '¡Hola, EJS asds!' });
// });

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});