const db = require('../database/conection');
const date = require('../util/date');

module.exports = {
    all() {
        return new Promise((suc, rej) => {
            db.all('SELECT * from gallery', function (err, rows) {
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
    }
}