const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");


app.use('/static', express.static('files'))
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", routes);
const port = 3000;

// Configura EJS como motor de plantillas
app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

// // Ruta de inicio
// app.get('/', (req, res) => {
//     res.render('index', { mensaje: '¡Hola, EJS asds!' });
// });

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
