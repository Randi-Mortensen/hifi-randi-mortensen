const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkter', function (req, res) {
        var app = `select
         produkter.navn as 'navn',
         producent.navn as 'producent',
         kategori.navn as 'kategori',
         produkter.billede as 'billede',
         produkter.varenr as 'varenr',
         produkter.pris as 'pris'
            from produkter
            inner join producent
            on producter.producent = producent.navn
            inner join kategori
            on producter.kategori = kategori.navn`
        db.query(app, function (err, data) {
            res.send(data);
        })
    });
    app.post('/create', (req, res) => {

        let values = [];
        values.push(req.body.navn);
        values.push(req.body.producent);
        values.push(req.body.kategori);
        values.push(req.body.billede);
        values.push(req.body.varenr);
        values.push(req.body.pris);


        db.execute('insert into produkter set navn = ?, producent = ?, kategori = ?, billede = ?, varenr = ?, pris = ?', values, (err, rows) => {
            if (err) {
                console.log(err);
                res.json(500, {
                    "message": "Internal Server Error",
                    "error": err
                })
            }
            else {
                res.json(200, {
                    "message": "Data indsat"
                })
            }
        })
    });
};