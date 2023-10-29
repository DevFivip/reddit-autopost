const usuario = require("../model/usuario");

module.exports = {
    async index(req, res) {
        const usuarios = await usuario.all();
        res.render("usuarios/index", { usuarios });
    },
    async create(req, res) {
        res.render("usuarios/create");
    },
    async store(req, res) {
        await usuario.create(req.body);
        res.redirect('usuarios/');
    },
    async show(req, res) {
        const { usuario_id } = req.params;
        const user = await usuario.find(usuario_id);
        console.log(user)
        res.render("usuarios/show", { user });
    },
    async update(req, res) {
        console.log(req.body)
        const { usuario_id } = req.params
        await usuario.update(req.body, usuario_id);
        res.redirect('/usuarios');
    },
};
