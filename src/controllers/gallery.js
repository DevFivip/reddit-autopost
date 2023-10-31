const gallery = require("../model/gallery");
const fs = require('fs');
const path = require('path');

module.exports = {
    async index(req, res) {
        const images = await gallery.all();
        res.render("gallery/index", { images });
    },
    async create(req, res) {
        res.render("gallery/create");
    },
    async store(req, res) {
        const newFileNames = req.files.map(file => file.filename);
        console.log(newFileNames);
        await gallery.createMany(newFileNames);
        res.redirect('/gallery');
    },
    async show(req, res) {
        const { imagen_id } = req.params;
        const imagen = await gallery.findOne(imagen_id);
        console.log(imagen)
        res.render("gallery/show", { imagen });
    },
    async delete(req, res) {
        const { imagen_id } = req.params;
        const imagen = await gallery.findOne(imagen_id);
        const filePath = path.join(__dirname, '../../files', imagen.archivo_nombre);
        // Verificar si el archivo existe
        if (fs.existsSync(filePath)) {
            // Eliminar el archivo
            fs.unlinkSync(filePath);
            await gallery.delete(imagen_id);
            res.send(`Archivo "${imagen.archivo_nombre}" eliminado exitosamente.`);
        } else {
            res.status(404).send('El archivo no existe.');
        }
        // res.redirect('/gallery');
    }
};
