app.get('/sorted', function (req, res) {
    var sql = `
    select
    type.navn as type,
    fruit.navn, fruit.pris,
    fruit.image
    from fruit inner join type on fruit.fk_type = type.id
    order by fruit.fk_type`;
    db.query(sql, function (err, data) {
        var json = [];
        var prod = [];
        var type = "";
        var firsttime = true;
        var count = data.length;
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
            prod.push(JSON.parse(`{"navn":"${element.navn}", "pris":"${element.pris}", "image":"${element.image}"}`)); // indsæt produkt i produktlisten

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