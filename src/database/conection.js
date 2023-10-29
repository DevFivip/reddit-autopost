// Importa la biblioteca sqlite3
const sqlite3 = require('sqlite3').verbose();

// Crea una nueva instancia de la base de datos en memoria
const db = new sqlite3.Database(__dirname + "/database.db");

// Crea una tabla llamada 'usuarios'
db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        reddit_name TEXT,
        reddit_password TEXT,
        status INT
    )`);
});

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        imagen_name TEXT,
        imagen_link_imgur TEXT,
        contenido TEXT,
        usuario_id INTEGER,
        fecha_creacion DATETIME,
        fecha_publicacion DATETIME,
        status INT,
        FOREIGN KEY(usuario_id) REFERENCES usuarios(id))`);
});

// Cierra la conexión a la base de datos al final


module.exports = db