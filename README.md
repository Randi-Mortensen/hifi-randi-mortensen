# hifi-randi-mortensen
Webintegration Hi-Fi project

# app.js

## Opsætning af server

start med npm init
npm init // installere package.json

Installerer følgende modules:
* restify
* restify-cors-middleware
>npm install restify, restify-cors-middleware, mysql2 --save

Restify gør det muligt at oprette en API-server (get, post, put og delete).

```javascript
const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
const server = restify.createServer({
    'name': 'hifi', //key : value
    'version': '1.0.0'//key : value
});

server.use(restify.plugins.bodyParser()); //bruges ved kontaktformularer.
const cors = corsmiddleware({ origins: ['*'] }); //orgins styrer hvilke domæner der har adgang.
server.pre(cors.preflight);
server.use(cors.actual);

require('./routes/index')(server);

server.listen(1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});
```
# Routes

# Routes/Index App
index.js
```javascript
module.exports = (app) => {
    require('./produkter')(app);
    //require('./kontakt')(app);
}


```
## INNER JOIN UDE I SQL PHPMYADMIN
------------------------------- 
SELECT `produkter`.`navn` as 'produktnavn', `producent`.`navn` as 'producent', `kategori`.`navn` as 'kategori'
FROM `produkter` 
INNER join `producent` on `produkter`.`producent`=`producent`.`id`
INNER join `kategori` on `produkter`.`kategori`=`kategori`.`id`

## INNER JOIN INDE I ROUTES PRODUKT.JS
```javascript
const db = require('../config/sql').connect();

module.exports = function (app) {
    app.get('/produkter', function (req, res) {
        var app = `SELECT produkter.navn as 'produktnavn', producent.navn as 'producent', kategori.navn as 'kategori'
        FROM produkter 
        INNER join producent on produkter.producent=producent.id
        INNER join kategori on produkter.kategori=kategori.id`

        db.query(app, function (err, data) {
            res.send(data);
        })
    })
}

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
```
## /produkt
Vælger alle produkter
```javascript
app.get('/produkt', function (req, res) {
        db.query('select * from hifi', function (err, data) {
            res.send(data);
        })
    })
}



```
## /produkt/kategori/:id
Henter alle produkter i kategori-id
```javascript
app.get('/produkter/kategori/:id', function (req, res) {

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
}


```
## /produkt
Vælger et bestemt produkt ud fra et produkt-id under producent_navn
```javascript
app.get('/produkt/:id', function (req, res) {
        db.query('select * from hifi where producent_navn = ?', [req.params.id], function (err, data) {
            res.send(data);
        })
    })
```
## /produkt.js
```javascript
const db = require('../config/sql').connect();

module.exports = function (app) {

    //---- Henter alle produkter -------------------------------------------------------------------------------------------

    app.get('/produkt', function (req, res) {  // app.get app er lig med et object get er lig en function

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

        db.query(sql, function (err, data) {  // gør_noget();  er lig med en function på grund af paranteserne
            'use strict';
            var json = [];  // var json = [];  er lig med et array på grund af firkantklammerne
            var prod = [];  // var prod = [];  er lig med et array på grund af firkantklammerne
            var type = "";  // var type = "";  er lig med en string på grund af plingerne
            var firsttime = true;
            var count = data.length;

            console.log(count);//Viser om der er fat i alle variabler

            data.forEach(function (element, index) {
                console.log("Har fat i et produkt i forEach");
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

            console.log("test");
            res.send(json);
        })
    })

    //----henter produkter tilhørende type      (kald type kategori i næste project)----------------------------------------------------------------

    app.get('/produkt/type/:id', function (req, res) {  // app.get app er lig med et object get er lig en function

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

        WHERE type.id = ?

        ORDER BY type.id`

        db.query(sql, [req.params.id], function (err, data) {  // gør_noget();  er lig med en function på grund af paranteserne
            'use strict';
            var json = [];  // var json = [];  er lig med et array på grund af firkantklammerne
            var prod = [];  // var prod = [];  er lig med et array på grund af firkantklammerne
            var type = "";  // var type = "";  er lig med en string på grund af plingerne
            var firsttime = true;
            var count = data.length;

            console.log(count);//Viser om der er fat i alle variabler

            data.forEach(function (element, index) {
                console.log("udskriver element");
                console.log(element);
                console.log("Har fat i et produkt i forEach");
                var newType = (element.type_navn != type); // sæt newType lig med true eller false 
                if (newType) { // hvis det er en ny type
                    if (!firsttime) { // og det ikke er første gennemløb
                        var stringProd = JSON.stringify(prod); // lav json-array om til string
                        var stringType = `"type":"${type}"`;
                        var obj = `{${stringType},"prod": ${stringProd}}`;
                        json.push(JSON.parse(obj));
                    }
                    firsttime = false; // først gennemløb slut
                    type = element.type_navn; // husk type
                    prod = []; // tøm listen med produkter
                }
                prod.push(JSON.parse(`{"navn":"${element.produkt_navn}", "producent":"${element.producent_navn}", "type_navn":"${element.type_navn}", "billede":"${element.produkt_billede}", "varenr":"${element.produkt_varenr}", "pris":"${element.produkt_pris}"}`)); // indsæt produkter i produktlisten

                // hvis det er sidste produkt, så sæt det på listen (bør laves som en function, da koden er en kopi af ovenstående)
                if (count <= (index + 1)) {
                    var stringProd = JSON.stringify(prod);
                    var stringType = `"type":"${type}"`;
                    var obj = `{${stringType},"prod": ${stringProd}}`;
                    json.push(JSON.parse(obj));
                }
            }, this);

            console.log("test");
            res.send(json);
        })
    })

    //---- Send nyt produkt til database -------------------------------------------------------------------------------------------

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
```
## /produkt.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Produkt</title>
    <!-- Bootstrap CSS -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
        crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="./assets/css/style.css" rel="stylesheet">

</head>

<body>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                                              <span class="sr-only">Toggle navigation</span>
                                              <span class="icon-bar"></span>
                                              <span class="icon-bar"></span>
                                              <span class="icon-bar"></span>
                                            </button>
                <a class="navbar-brand" href="index.html">HiFi Klubben</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="index.html">Forside </a></li>
                    <li class="active"><a href="produkt.html">Produkter <span class="sr-only">(current)</span></a></li>
                    <li><a href="kontakt.html">kontakt</a></li>
                </ul>
                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Go!</button>
                </form>
                </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
    <h2>Vælg Produkter</h2>
    <nav>
        <ul id="menu-links">
            <!-- Menuen genereres dynamisk vha. javascript i "js/menu.js" -->
        </ul>
    </nav>
    <section>
        <article>
            <p id="output">
                <em>(Vælg en kategori. ID'et bliver udskrevet her.)</em>
            </p>
            <p><a href="produkt.html">Fjern alle URL parametre</a></p>
            <hr>
        </article>
        <article>
            <h2>Valgte Produkter</h2>
            <div id="content"></div>
            <hr>
        </article>
        <article>
            <h2>Indsæt Nyt Produkt</h2>
            Navn: <input type="text" id="produkt_navn"><br> Producent: <input type="text" id="producent_navn"><br> Type:
            <input type="text" id="type_navn"><br> Billede: <input type="text" id="produkt_billede"><br> Vare Nr.:
            <input type="text" id="produkt_varenr"><br> Pris: <input type="text" id="produkt_pris"><br>
            <button id="gem">Gem</button>
            <br><br>
            <hr>
        </article>
    </section>
    <!-- Indlæser hjælpefunktioner -->
    <script src="./assets/js/funktioner.js"></script>

    <!-- Indlæser filen, der indeholder statiske kategorier (kun til at teste eksemplet) -->
    <script src="assets/data/data_kategorier.js"></script>

    <!-- Indlæser filen, der genererer menuen dynamisk -->
    <script src="./assets/js/menu.js"></script>

    <!-- Indlæser filen, der skal manipulere indholdet af siden -->
    <script src="./assets/js/produkt.js"></script>
</body>
<footer>
    <p>© HiFi Klubben v. Randi Mortensen 2017</p>
</footer>

</html>
```
## package.json
```json 
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
```
## config
   
    sql.js
```javascript 
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
```
## data
        produkter.js
```javascript 
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
```
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


    * services
        produkter.js
 
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
            