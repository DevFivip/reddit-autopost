const db = require('../database/conection');
module.exports = {
    all(){
        return new Promise((suc, rej) => {
            db.all('SELECT * from post', function (err, rows) {
                if (err) {
                    rej(err.message)
                } else {
                    console.log(rows)
                    suc(rows)
                }
            });
        })
    },
}