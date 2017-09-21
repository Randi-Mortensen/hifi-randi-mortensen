const mysql = require('mysql2');
const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'hifi'
});
const crypto = require('crypto');

module.exports = {
    'isAuthenticated': (req, res, next) => {
        if (req.header('Authorization')) {
            const query = `SELECT id FROM tokens
            WHERE token = ?`;

            db.execute(query, [req.header('Authorization')], (err, rows) => {
                if (err) {
                    return next(err, null);
                } else {
                    if (rows.length === 1) {
                        return next(null);
                    } else {
                        return next('unauthorized', null);
                    }
                }
            });
        }
    },
    'generateTolken': (next) => {
        crypto.randomBytes(256, (err, buffer) => {
            if (err) {
                return next(err, null);
            } else {
                return next(null, buffer.toString('hex'));
            }
        });
    }
};