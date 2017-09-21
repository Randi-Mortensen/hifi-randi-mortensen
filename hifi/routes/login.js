const mysql = require('mysql2');
const db = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'hifi'
});
const security = require('../services/security');

module.exports = (server) => {
    server.post('/login', (req, res) => {
        if (req.body.username === 'admin' &&
            req.body.password === '1234') {
            security.generateTolken((err, token) => {
                const query = `ÌNSERT INTO tokens 
                SET token = ?`;
                db.execute(query, [token], (error, rows) => {
                    if (!error) {
                        res.send({ 'token': token });
                    }
                })
            });
        }
    });
};