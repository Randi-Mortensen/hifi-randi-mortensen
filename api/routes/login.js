const db = require('../config/mysql').connect();
const passwordHash = require('password-hash');
const crypto = require('crypto');

module.exports = (app) => {
    app.post('/login', (req, res) => {
        if (req.body.password !== '' && req.body.username !== '') {
            console.log(passwordHash.generate(req.body.password));
            db.execute('SELECT id, password FROM users WHERE username = ?', [req.body.username], (selError, rows) => {
                if (passwordHash.verify(req.body.password, rows[0].password)) {
                    crypto.randomBytes(256, (err, buf) => {
                        if (err) return res.status(500).end();
                        else {
                            const token = buf.toString('hex');
                            db.execute('INSERT INTO accesstokens SET userid = ?, token = ?', [rows[0].id, token], (insError) => {
                                if (insError) return res.status(500).end();
                                else return res.send({
                                    "ID": rows[0].id,
                                    "AccessToken": token
                                });
                            });
                        }
                    });
                } else {
                    res.send(401);
                }
            });
        } else {
            res.send(401);
        }
    });
};