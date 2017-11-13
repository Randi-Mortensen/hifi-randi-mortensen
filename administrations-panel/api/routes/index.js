const restify = require('restify');
const path = require('path');
const mysql = require(path.join(__dirname, '..', 'config', 'mysql'));

module.exports = (app) => {

    app.get('/produkt', (req, res, next) => {
        let db = mysql.connect();
        db.execute(`SELECT * FROM produkt`, [], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.json(200, rows);
            }
        })
        db.end();
    });

    app.get('/produkt/:id', (req, res, next) => {
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        if (id > 0) {
            let db = mysql.connect();
            db.execute(`SELECT * FROM produkt WHERE id = ?`, [req.params.id], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(200, rows);
                }
            })
            db.end();
        } else {
            res.json(400, {
                message: 'id ikke valid'
            });
        }
    });

    app.post('/produkt', (req, res, next) => {

        let navn = (req.body.navn == undefined ? '' : req.body.navn);
        let description = (req.body.description == undefined ? '' : req.body.description);
        let pris = (req.body.pris == undefined ? 0 : req.body.pris);
        pris = pris.replace(',', '.');

        if (navn != '' && description != '' && !isNaN(pris)) {

            let db = mysql.connect();
            db.execute(`INSERT INTO produkt SET navn = ?, description = ?, pris = ?`, [navn, description, pris], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(200, rows);
                }
            })
            db.end();
        } else {
            res.json(400, {
                message: 'validering fejlede'
            });
        }
    });

    app.put('/produkt/:id', (req, res, next) => {

        let navn = (req.body.navn == undefined ? '' : req.body.navn);
        let description = (req.body.description == undefined ? '' : req.body.description);
        let price = (req.body.pris == undefined ? 0 : req.body.pris);
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        pris = pris.replace(',', '.');

        if (navn != '' && description != '' && !isNaN(pris) && id > 0) {

            let db = mysql.connect();
            db.execute(`UPDATE produkt SET navn = ?, description = ?, pris = ? WHERE id = ?`, [navn, description, pris, id], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(200, rows);
                }
            })
            db.end();
        } else {
            res.json(400, {
                message: 'validering fejlede'
            });
        }
    });

    app.del('/produkt/:id', (req, res, next) => {
        let id = (isNaN(req.params.id) ? 0 : req.params.id);
        if (id > 0) {
            let db = mysql.connect();
            db.execute(`DELETE FROM produkt WHERE id = ?`, [req.params.id], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(204);
                }
            })
            db.end();
        } else {
            res.json(400, {
                message: 'id ikke valid'
            });
        }
    });





    // ========================== static
    app.get('/.*', restify.plugins.serveStatic({
        'directory': 'public',
        'default': 'index.html'
    }));

}