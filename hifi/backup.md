 /*
     app.get('/home', function (req, res) {
        var sqlKategori = `SELECT 
        
        produkter.billede AS produkt_billede,
        kategori.navn     AS kategori_navn

        FROM produkter
        
        INNER JOIN kategori 
        
        ON produkter.kategori = kategori.id
        
        GROUP BY kategori`

        db.query(sqlKategori, function (err, data) {
            res.send(data);
        });

*/
 /*
        var sqlKategori = `SELECT * FROM kategori`;
        db.query(sqlKategori, function (err, kategoriData) {
 
            var produkterDerSkalSendesTilbage = [];
 
            console.log("Lige før forEach");
 
            kategoriData.forEach(function (aktuelleKategori) {
                console.log(aktuelleKategori.id);
 
                var sqlProdukt = `
                    SELECT *
                    FROM produkter
                    WHERE kategori = ?
                    ORDER BY RAND()
                    LIMIT 1
                `;
                db.query(sqlProdukt, [aktuelleKategori.id], function (err, produktData) {
                    if (err) {
                        console.log("Fejl: " + err.message)
                    }
 
                    console.log("Navn: " + produktData[0].navn);
                    //console.log("Udskriver produktData: ");
                    //console.log(produktData);
                    produkterDerSkalSendesTilbage.push(produktData[0]);
 
                });
            });
            console.log("Lige efter forEach");
 
            console.log(produkterDerSkalSendesTilbage);
 
            res.send(produkterDerSkalSendesTilbage);
        });
 
        */



        // var sql = `SELECT
        // produkter.billede   AS produkt_billede
        // produkter.navn      AS produkt_navn,
        // produkter.pris      AS produkt_pris

        // FROM produkter`
        // db.query(sql, function (err, data) {
        //     res.send(data);
        // })

        // Kun testet direkte i PhpMyAdmin, men det virker

        // SELECT * FROM `produkter`
        // INNER JOIN kategori ON produkter.kategori = kategori.id
        // GROUP BY kategori


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