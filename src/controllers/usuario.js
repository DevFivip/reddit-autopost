const usuario = require("../model/usuario");

module.exports = {
    async index(req, res) {
        const usuarios = await usuario.all()
        res.render('usuarios/index', { usuarios });
    }
}