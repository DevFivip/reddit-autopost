const db = require('../database/conection');
const date = require('../util/date');

module.exports = {
    all() {
        return new Promise((suc, rej) => {
            db.all('SELECT * from gallery order by id DESC', function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows)
                }
            });
        })
    },
    createMany(fileNames) {
        return new Promise((suc, rej) => {
            try {
                const stmt = db.prepare("INSERT INTO gallery (archivo_nombre,fecha_subida) VALUES (?,?)");
                fileNames.forEach(name => {
                    console.log(date());
                    stmt.run(name, date());
                });
                stmt.finalize();
                suc(true)
            } catch (error) {
                rej(false)
            }

        })
    },
    findOne(imagen_id) {
        return new Promise((suc, rej) => {
            db.all('SELECT * from gallery where id = '+ imagen_id, function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows[0])
                }
            });
        })
    },
    delete(imagen_id) {
        return new Promise((suc, rej) => {
            db.serialize(function () {
                try {
                    const stmt = db.prepare(`DELETE from gallery where id = ?`);
                    stmt.run(imagen_id);
                    stmt.finalize();
                    suc(true);
                } catch (error) {
                    rej(error)
                }
            });
        })
    },
    
}