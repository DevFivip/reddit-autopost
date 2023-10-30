const db = require('../database/conection');
module.exports = {
    all() {
        return new Promise((suc, rej) => {
            db.all('SELECT * from usuarios', function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows)
                }
            });
        })
    },
    create(data) {
        const { nombre, reddit_name, reddit_password } = data;
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare("INSERT INTO usuarios (nombre,reddit_name,reddit_password,status) VALUES (?,?,?,1)");
                    stmt.run(nombre, reddit_name, reddit_password);
                    stmt.finalize();
                    suc(data);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    update(data, usuario_id) {
        const { nombre, reddit_name, reddit_password } = data;
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`UPDATE usuarios set nombre= ?, reddit_name= ?, reddit_password=? where id = ?`);
                    stmt.run(nombre, reddit_name, reddit_password, usuario_id);
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
            db.all(`SELECT * from usuarios where id = ${id}`, function (err, rows) {
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
                    const stmt = db.prepare(`DELETE from usuarios where id = ?`);
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
                    const stmt = db.prepare(`UPDATE usuarios set status=? where id = ?`);
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