# hifi-randi-mortensen
Webintegration Hi-Fi project

* Oprettet hifi-randi-mortensen mappe
* Oprettet hifi-randi-mortensen reposotori
## Mappe / File struktur hifi-randi-mortensen
* hifi
* public

.gitignore  // noget github ??? </br>
 README.md  //denne fil

 # Mappe / File struktur hifi
app.js
<!-- 
const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
const server = restify.createServer({
    'name': 'hifi',
    'version': '1.0.0'
});

server.use(restify.plugins.bodyParser());
const cors = corsmiddleware({ origins: ['*'] });
server.pre(cors.preflight);
server.use(cors.actual);

require('./routes/index')(server);

server.listen(1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});
-->
package.json
<!-- 
{
  "name": "hifi-randi-mortensen",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "browser-sync": "^2.18.13",
    "mysql2": "^1.4.2",
    "restify": "^6.0.1",
    "restify-cors-middleware": "^1.0.1"
  }
}
-->
    * config
        sql.js
<!-- 
const mysql = require('mysql2');

module.exports = {
    'connect': () => {
        return mysql.createConnection({
            'host': 'localhost',
            'user': 'root',
            'password': '',
            'database': 'hifi'
        });
    }
};
-->
    * data
        produkter.js
<!-- 
module.exports = [{
    "navn": "evolution 50cd",
    "producent": "creek",
    "kategori": "cd-afspiller",
    "billede": "creek_evo_cd.jpg",
    "varenr": 501,
    "pris": 569.00,
    "beskrivelse": {
        "tekst": "Rigtig god lyd til prisen...",
    }
},
{
    "navn": "parasound_d200",
    "producent": "parasound",
    "kategori": "dvd-afspiller",
    "billede": "parasound_d200.jpg",
    "varenr": 601,
    "pris": 1895.99,
    "beskrivelse": {
        "tekst": "Rigtig god lyd til prisen...",
    }
},
{
    "navn": "pro_ject_debut_3_bl",
    "producent": "pro_ject",
    "kategori": "pladespiller",
    "billede": "pro_ject_debut_3_bl.jpg",
    "varenr": 701,
    "pris": 2595.00,
    "beskrivelse": {
        "tekst": "Rigtig god lyd til prisen...",
    }
},
{
    "navn": "harbeth_p3es2",
    "producent": "harbeth",
    "kategori": "højtaler",
    "billede": "harbeth_p3es2.jpg",
    "varenr": 801,
    "pris": 1385.95,
    "beskrivelse": {
        "tekst": "Rigtig god lyd til prisen...",
    }
}
];
-->
    * node_modules
<!-- -->
    * routes
        index.js
<!-- 
module.exports = (server) => {
    require('./produkter')(server);
    //require('./kontakt')(server);
}
-->
        produkter.js
<!-- 
const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkter', function (req, res) {
        db.query('select * from produkter', function (err, data) {
            res.send(data);
        })
    })
}
-->
    * services
        produkter.js
<!-- 
const produkter = require('../data/produkter');
/**
 * @module produkter
 */
module.exports = {
    /**
     * getAll
     * Retunerer et json object med alle produkter fra kartoteket
     * @returns {Object}
     */
    'getAll': () => produkter,

    /**
     * getOne
     * Retunerer et json object med et enkelt produkt fra kartoteket
     * @param {string} varenr - varenummeret på et produkt
     * @returns {Object}
     */
    'getOne': (varenr) => {
        let currentKategori = null;
        produkter.forEach((kategori) => {
            if (kategori.varenr == varenr) {
                currentKategori = JSON.stringify(kategori);
            }
        });

        if (currentKategori !== null) {
            return currentKategori;
        } else {
            return {
                "code": "ResourceNotFound",
                "message": "${varenr} does not exist"
            };
        }
    }
};

// server.post('/produkter', (req, res) => {
//     res.send(200, req.body);
// });
// };
// }
// };
-->

 # Mappe / File struktur public
    * assets </br>
        * css   //stylesheet mappe</br> 
            bootstrap css filer.</br>
            style.css 
<!-- 
body {
    margin:0;
    padding:0;
}
.navbar-left {
    float: right!important;
}
footer {
    text-align: center;
    height: 50px;
    width: 100%;    
} 
-->
    * js //javascript Mappe
        * bootstrap.js
        * bootstrap.min.js
        * npm.js
<!--
    
-->

    * media //Billeder, Videoer & lyd filer     
<!-- 
Alle billeder til projectet ligger her
-->
* node_modules </br>
app.js </br>
<!-- 
const browserSync = require('browser-sync').create();
browserSync.watch('./public/**/*').on('change', browserSync.reload);
browserSync.init({
    'server': './public'
});
-->
produkt.html
<!-- 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Produkt</title>
</head>

<body>
    <nav>
        <ul>
            <li><a href="/">Forside</a></li>
            <li><a href="/produkt.html">Produkt</a></li>
            <li><a href="/kontakt.html">Kontakt</a></li>
        </ul>
    </nav>
    <h1>Produkt</h1>
    <div id="content"></div>
    <script>
        fetch('http://localhost:1337/produkter')
            .then((response) => {
                // grib svarets indhold (body) og send det som et json objekt til næste .then()
                return response.json();
            })
            .then((data) => {
                // nu er json objektet lagt ind i data variablen, udskriv data
                console.log(data);
                document.getElementById('content').innerHTML = data[0].navn + " " + data[0].pris;
            })
    </script>
</body>

</html>
-->

## Indsæt nyt i database
<h2>Indsæt Nyt Produkt i databasen</h2>

    Navn: <input type="text" id="navn"><br> 
    Producent: <input type="text" id="producent"><br> 
    Kategori: <input type="text"  id="kategori"><br> 
    Billede: <input type="text" id="billede"><br> 
    VareNr: <input type="text" id="varenr"><br> 
    Pris: <input type="text" id="pris"><br>
    <button id="gem">Gem</button>
    <br><br> 

    eks.:   Pioneer PLX-500.K
            Pioneer
            pladespiller
            plx-500-k.jpg
            702
            2600.00
            