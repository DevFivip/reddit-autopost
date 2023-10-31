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
    }
};
