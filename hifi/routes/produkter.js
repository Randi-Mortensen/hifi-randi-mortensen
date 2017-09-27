const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkter', function (req, res) {
        var app = `SELECT 
        produkter.id      AS produkt_id,
        produkter.navn    AS produkt_navn, 
        produkter.billede AS produkt_billede, 
        produkter.varenr  AS produkt_varenr, 
        produkter.pris    AS produkt_pris,

        producent.navn    AS producent_navn, 
        kategori.navn     AS kategori_navn 
        
        FROM produkter 
        INNER join producent ON produkter.producent = producent.id
        INNER join kategori ON produkter.kategori = kategori.id`

        db.query(app, function (err, data) {
            res.send(data);
        })
    })
    app.get('/home', funktion(req, rews) {
        var app = `SELECT
        produkter.billede   AS produkt_billede
        produkter.navn      AS produkt_navn,
        produkter.pris      AS produkt_pris
        
        FROM produkter`
        db.query(app, function (err, data) {
            res.send(data);
        })
    })
}

// app.post('/create', (req, res) => {

//     let values = [];
//     values.push(req.body.produkt_navn);
//     values.push(req.body.producent_navn);
//     values.push(req.body.kategori_navn);
//     values.push(req.body.produkt_billede);
//     values.push(req.body.produkt_varenr);
//     values.push(req.body.produkt_pris);


//     db.execute('insert into hifi set navn = ?, producent = ?, kategori = ?, billede = ?, varenr = ?, pris = ?', values, (err, rows) => {
//         if (err) {
//             console.log(err);
//             res.json(500, {
//                 "message": "Internal Server Error",
//                 "error": err
//             })
//         }
//         else {
//             res.json(200, {
//                 "message": "Data indsat"
//             })
//         }
//     })
// });