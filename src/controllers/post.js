const gallery = require("../model/gallery");
const post = require("../model/post");
const subreddit = require("../model/subreddit");
const usuario = require("../model/usuario");
const { setFecha } = require("../util/date");
const imgur = require("../util/imgur");
const { uploadToReddit } = require("../util/reddit");
const watermark = require("../util/watermark");
const path = require('path');
const fs = require('fs');

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
    // async show(req, res) {
    //     const usuarios = await usuario.actives();
    //     const subreddits = await subreddit.actives();
    //     const gallerys = await gallery.all();
    //     res.render("posts/show", { usuarios, subreddits, gallerys });
    // },
    async store(req, res) {
        console.log(req.body);
        await post.create(req.body);
        res.redirect('/posts');
    },
    async remove(req, res) {
        const { post_id } = req.params
        await post.delete(post_id);
        res.redirect('/posts');
    },
    async show(req, res) {
        const { post_id } = req.params;
        const _post = await post.findOne(post_id);
        const _fecha = setFecha(_post.fecha_programada);
        const usuarios = await usuario.actives();
        const subreddits = await subreddit.actives();
        const gallerys = await gallery.all();
        const usuarioSelected = await usuario.find(_post.usuario_id)
        let logsList = [];

        const directorio = path.join(__dirname, '../../files/logs/' + _post.id);// Reemplaza 'nombre_del_directorio' con el nombre de tu directorio
        // Comprueba si el directorio existe
        if (!fs.existsSync(directorio)) {

        } else {
            logsList = fs.readdirSync(directorio);
        }

        res.render("posts/show", { _post, usuarios, subreddits, gallerys, _fecha, usuarioSelected, logsList });
    },
    async update(req, res) {
        const { post_id } = req.params;
        await post.update(req.body, post_id);
        res.redirect('/posts');
    },

    async imgur(req, res) {

        const { post_id } = req.params;
        const _post = await post.findOne(post_id);
        const _usuario = await usuario.find(_post.usuario_id);

        if (_post.file_url === null) {
            const file = await watermark.mark(_post.file_dir, 'u/' + _usuario.reddit_name)
            // console.log(file);
            const link = await imgur.send(file);
            // console.log(link)
            await post.updateLinkImgur(link, file, _post.id);
        }

        res.send('success');
    },

    async reddit(req, res) {

        const { post_id } = req.params;
        const _post = await post.findOne(post_id);
        const _usuario = await usuario.find(_post.usuario_id);

        if (_post.status != 2) {
            const status = await uploadToReddit(_post, _usuario);
            console.log({ status })
            if (status) {
                await post.updateStatus(2, _post.id);
            }
        } else {
            console.log('ya enviado')
        }

        res.send('success');
    },



}