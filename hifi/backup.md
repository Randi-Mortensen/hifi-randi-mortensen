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






-------------------------------------------------------------------------------------------------------
<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
                <div class="list-group">
                    <a href="#" class="list-group-item active">Home</a>
                    <a href="#" class="list-group-item">CD Player</a>
                    <a href="#" class="list-group-item">DVD Player</a>
                    <a href="#" class="list-group-item">Record Player</a>
                    <a href="#" class="list-group-item">Surroundanlæg</a>
                    <a href="#" class="list-group-item">Højtalere</a>
                    <a href="#" class="list-group-item">Forstærkere</a>
                    <a href="/kontakt.html" class="list-group-item">Kontakt</a>
                </div>
            </div>
            <!--/.sidebar-offcanvas -->
            </div>

-------------------------------------------------------------------------------------------------------

// Lytter på om der er klikket på knappen gem - herefter postes data som indsættes i databasen
document.querySelector('#gem').addEventListener('click', (event) => {
    console.log('event ok');
    event.preventDefault();
    let navn = document.querySelector('#navn').value;
    let type = document.querySelector('#type').value;
    let pris = document.querySelector('#pris').value;
    let billede = document.querySelector('#billede').value;
    // Når sidens elementer (alt indhold) er loadet på siden
    (() => {
        document.addEventListener('DOMContentLoaded', () => {
            hentData(0);
        });

    })();

    // Funktion som henter data til visning i content
    // Funktionen har en parameter - hvis tallet nul hentes alt indhold, og hvis større end nul hentes kun denne ene kategori
    function hentData(type = 0) {
        let url = 'http://localhost:1337/produkt';
        if (type > 0) url += '/' + type;
        fetch(url)
            .then((response) => {
                // grib svarets indhold (body) og send det som et json objekt til næste .then()
                return response.json();
            })
            .then((data) => {
                // nu er json objektet lagt ind i data variablen, udskriv data
                console.log(data);
                var type = '';
                document.getElementById('content').innerHTML = "";
                data.forEach(function (item) {
                    if (type != item.type) {
                        document.getElementById('content').innerHTML += `<h2>${item.type}</h2>`;
                        type = item.type;
                    }
                    document.getElementById('content').innerHTML += `
                        <div>
                            <b>${item.navn}</b><br>
                            pris: kr. ${item.pris}<br>
                            <img src="assets/media/${item.image}" width="60px" />
                        </div>  
                        `;

                })
            })
    }
    document.querySelector('#selecttype').addEventListener('change', (event) => {
        let obj = document.querySelector('#selecttype');
        hentData(obj.value);
    })
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"navn":"${navn}","type":"${type}","pris":"${pris}","billede":"${billede}" }`,
        cache: 'no-cache',
        mode: 'cors'
    };

    let request = new Request('http://localhost:1337/create', init);

    fetch(request)
        .then(response => { console.log(response) }).catch(err => { console.log(err) });

});
function hentData(type = 0) {
    let url = 'http://localhost:1337/produkt';
    fetch(url)
        .then((response) => {
            // grib svarets indhold (body) og send det som et json objekt til næste .then()
            return response.json();
        })
        .then((data) => {
            // nu er json objektet lagt ind i data variablen, udskriv data
            console.log(data);
            var type = '';
            document.getElementById('content').innerHTML = "";
            data.forEach(function (item) {
                document.getElementById('content').innerHTML += `<h2>${item.type}</h2>`;
                item.prod.forEach(function (prod) {
                    document.getElementById('content').innerHTML += `
                            <div>
                                <b>${prod.navn}</b><br>
                                pris: kr. ${prod.pris}<br>
                                <img src="images/${prod.image}" width="60px" /> 
                            </div>  
                            `;
                }, this);

            })
        })
}