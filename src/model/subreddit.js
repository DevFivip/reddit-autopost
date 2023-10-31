const db = require('../database/conection');
module.exports = {
    all() {
        return new Promise((suc, rej) => {
            db.all('SELECT * from subreddit', function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows)
                }
            });
        })
    },
    create(data) {
        const { nombre, tags, verificacion } = data;
        const v = verificacion == 'on' ? 1 : 0;
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare("INSERT INTO subreddit (nombre,verificacion,tags,status) VALUES (?,?,?,1)");
                    stmt.run(nombre,  v, tags);
                    stmt.finalize();
                    suc(data);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    update(data, subreddit_id) {
        const { nombre, verificacion, tags } = data;
        const v = verificacion == 'on' ? 1 : 0;
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`UPDATE subreddit set nombre= ?, verificacion= ?, tags=? where id = ?`);
                    stmt.run(nombre, v, tags, subreddit_id);
                    stmt.finalize();
                    suc(data);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    find(id) {
        return new Promise((suc, rej) => {
            db.all(`SELECT * from subreddit where id = ${id}`, function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows[0])
                }
            });
        })
    },
    remove(id) {
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`DELETE from subreddit where id = ?`);
                    stmt.run(id);
                    stmt.finalize();
                    suc(true);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    status(id, status) {
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`UPDATE subreddit set status = ? where id = ?`);
                    stmt.run(!status, id);
                    stmt.finalize();
                    suc(id);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
}