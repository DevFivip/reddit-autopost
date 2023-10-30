const galery = require("../model/galery");

module.exports = {
    async index(req, res) {
        const images = await galery.all();
        res.render("galery/index", { images });
    }
};
