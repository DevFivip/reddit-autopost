const subreddit = require("../model/subreddit");

module.exports = {
    async index(req, res) {
        const subreddits = await subreddit.all();
        res.render("subreddit/index", { subreddits });
    },
    async create(req, res) {
        res.render("subreddit/create");
    },
    async store(req, res) {
        await subreddit.create(req.body);
        res.redirect('subreddit/');
    },
    async show(req, res) {
        const { subreddit_id } = req.params;
        const _subreddit = await subreddit.find(subreddit_id);
        res.render("subreddit/show", { _subreddit });
    },
    async update(req, res) {
        const { subreddit_id } = req.params
        await subreddit.update(req.body, subreddit_id);
        res.redirect('/subreddit');
    },
    async status(req, res) {
        const { subreddit_id } = req.params
        const _subreddit = await subreddit.find(subreddit_id);
        await subreddit.status(subreddit_id, _subreddit.status);
        res.redirect('/subreddit');
    },
    async remove(req, res) {
        const { subreddit_id } = req.params
        await subreddit.remove(subreddit_id);
        res.redirect('/subreddit');
    },
};
