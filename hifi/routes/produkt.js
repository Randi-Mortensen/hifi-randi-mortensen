const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkt', function (req, res) {
        var sql = `SELECT 
        produkt.id      AS produkt_id,
        produkt.navn    AS produkt_navn, 
        produkt.billede AS produkt_billede, 
        produkt.varenr  AS produkt_varenr, 
        produkt.pris    AS produkt_pris,

        producent.navn    AS producent_navn, 
        type.navn     AS type_navn 
        
        FROM produkt 

        INNER join producent ON produkt.producent = producent.id
        INNER join type ON produkt.type = type.id

        ORDER BY type.id`

        db.query(sql, function (err, data) {
            var json = [];
            var prod = [];
            var type = "";
            var firsttime = true;
            var count = data.lenght;
            data.forEach(function (element, index) {
                var newType = (element.type != type); // sæt newType lig med true eller false 
                if (newType) { // hvis det er en ny type
                    if (!firsttime) { // og det ikke er første gennemløb
                        var stringProd = JSON.stringify(prod); // lav json-array om til string
                        var stringType = `"type":"${type}"`;
                        var obj = `{${stringType},"prod": ${stringProd}}`;
                        json.push(JSON.parse(obj));
                    }
                    firsttime = false; // først gennemløb slut
                    type = element.type; // husk type
                    prod = []; // tøm listen med produkter
                }
                prod.push(JSON.parse(`{"navn":"${element.produkt_navn}", "producent":"${element.producent_navn}", "type":"${element.type_navn}", "billede":"${element.produkt_billede}", "varenr":"${element.produkt_varenr}", "pris":"${element.produkt_pris}"}`)); // indsæt produkter i produktlisten

                // hvis det er sidste produkt, så sæt det på listen (bør laves som en function, da koden er en kopi af ovenstående)
                if (count <= (index + 1)) {
                    var stringProd = JSON.stringify(prod);
                    var stringType = `"type":"${type}"`;
                    var obj = `{${stringType},"prod": ${stringProd}}`;
                    json.push(JSON.parse(obj));
                }
            }, this);

            res.send(json);
        })
    })


    app.post('/create', (req, res) => {

        let values = [];
        values.push(req.body.produkt_navn);
        values.push(req.body.producent_navn);
        values.push(req.body.type_navn);
        values.push(req.body.produkt_billede);
        values.push(req.body.produkt_varenr);
        values.push(req.body.produkt_pris);


        db.execute('insert into hifi set navn = ?, producent = ?, type = ?, billede = ?, varenr = ?, pris = ?', values, (err, rows) => {
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
}