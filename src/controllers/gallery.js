const gallery = require("../model/gallery");

module.exports = {
    async index(req, res) {
        const images = await gallery.all();
        res.render("gallery/index", { images });
    },
    async create(req, res) {
        res.render("gallery/create");
    },
    async store(req, res) {
        res.send('Almacenados correctamente');
    }
};
