const db = require('../database/conection');

module.exports = {
    all() {
        return new Promise((suc, rej) => {
            db.all('SELECT * from galery', function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    suc(rows)
                }
            });
        })
    },
}