const gallery = require("../model/gallery");
const post = require("../model/post");
const subreddit = require("../model/subreddit");
const usuario = require("../model/usuario");

module.exports = {
    async index(req, res) {
        const posts = await post.all();
        console.log(posts);
        res.render("posts/index", { posts });
    },
    async create(req, res) {
        const usuarios = await usuario.actives();
        const subreddits = await subreddit.actives();
        const gallerys = await gallery.all();
        res.render("posts/create", { usuarios, subreddits, gallerys });
    },
    async store(req, res) {
        console.log(req.body);
        // const usuarios = await usuario.actives();
        // const subreddits = await subreddit.actives();
        // const gallerys = await gallery.all();
        // res.render("posts/create", { usuarios, subreddits, gallerys });
    }
}