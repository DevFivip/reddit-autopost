const db = require('../database/conection');
module.exports = {
    all() {
        return new Promise((suc, rej) => {
            db.all('SELECT t1.id,t1.titulo,t1.descripcion,t1.subreddits,t1.file_url,t1.file_dir,t1.status,t1.fecha_programada,t2.nombre from post as t1 left join usuarios as t2 on t2.id = t1.usuario_id order by t1.id DESC', function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    console.log(rows)
                    suc(rows)
                }
            });
        })
    },
    create(data) {
        const { titulo, descripcion, usuario_id, subreddits, fecha_programada, file_dir } = data;
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare("INSERT INTO post (titulo, descripcion, usuario_id,subreddits,fecha_programada,file_dir,status) VALUES (?,?,?,?,?,?,1)");
                    stmt.run(titulo, descripcion, usuario_id, subreddits, fecha_programada, file_dir);
                    stmt.finalize();
                    suc(data);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    delete(post_id) {
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`DELETE from post where id = ?`);
                    stmt.run(post_id);
                    stmt.finalize();
                    suc(true);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    findOne(id) {
        return new Promise((suc, rej) => {
            db.all(`SELECT * from post where id = ${id}`, function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows[0])
                }
            });
        })
    },
    update(data, post_id) {
        const { titulo, descripcion, usuario_id, subreddits, fecha_programada, file_dir } = data;
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`UPDATE post set titulo = ?, descripcion = ?, usuario_id = ?,subreddits = ?,fecha_programada = ?,file_dir = ? where id = ?`);
                    stmt.run(titulo, descripcion, usuario_id, subreddits, fecha_programada, file_dir, post_id);
                    stmt.finalize();
                    suc(data);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
}