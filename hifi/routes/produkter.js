const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkter', function (req, res) {
        db.query('select * from produkter', function (err, data) {
            res.send(data);
        })
    })
}