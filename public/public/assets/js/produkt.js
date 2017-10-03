// ========================================================


(() => {

    // Tilføjer en EventListener, der lytter på om browseren er færdig med at indlæse HTML'en
    document.addEventListener('DOMContentLoaded', function () {

        // Denne funktion er defineret i filen "js/produkter.js"
        udskrivProdukter();
    });
})();


// ========================================================


// Selv om funktionen hedder udskrivProdukter, bliver der i eksemplet ikke hentet nogen produkter.
// Eksemplet viser, hvordan man arbejder med URL parametre.
// Jeg har skrevet i koden, hvor du kan indsætte fetch() koden, som henter data fra en API.

function udskrivProdukter() {

    // Henter et array med alle URL parametre.
    // Definitionen af hentAlleUrlParametre funktionen ligger i "js/funktioner.js"
    var alleUrlParametre = hentAlleUrlParametre();

    // Logger indholdet af alleUrlParametre  (tænd linjen, hvis du vil fejlfinde)
    // console.log (alleUrlParametre);

    // Tjekker om kategoriID findes i URL'en
    if (alleUrlParametre.typeID !== undefined) {

        // Gemmer en kopi af kategoriID fra URL'en i vores egen variabel,
        // så vi slipper for at skrive "alleUrlParametre.kategoriID"
        var typeID = alleUrlParametre.typeID;

        // Logger kategoriID fra URL'en  (tænd linjen, hvis du vil fejlfinde)
        console.log(`typeID: ${typeID}`);

        // Da dette eksempel ikke specifikt handler om API'er,
        // vil jeg bare nøjes med at vise, hvordan man bruger kategoriID i fetch'ens adresse

        var fetchUrl = `http://localhost:1337/produkt/type/${typeID}`;
        // fetch (fetchUrl).then().then() ...
        console.log(`fetch URL: ${fetchUrl}`);

        // Henter en reference til HTML elementet #output
        var output = document.querySelector("#output");

        // Udskriver en besked i browseren ved hjælp af innerHTML egenskaben.
        output.innerHTML = `Det valgte kategori ID er ${typeID}`;
    }
    else {
        console.log("typeID blev ikke fundet i URL'en");
    }
}


// ========================================================
fetch('http://localhost:1337/produkt')
    .then((response) => {
        // grib svarets indhold (body) og send det som et json objekt til næste .then()
        return response.json();
    })
    .then((data) => {
        // nu er json objektet lagt ind i data variablen, udskriv data
        console.log("her burde komme produkter");
        console.log(data);
        var content = document.getElementById('content');
        console.log("content");
        console.log("udskriv content");

        var type = '';
        document.getElementById('content').innerHTML = "";
        data.forEach(function (item) {
            document.getElementById('content').innerHTML += `<h2>${item.type_navn}</h2>`;
            item.prod.forEach(function (prod) {
                document.getElementById('content').innerHTML += `
                        <div>
                        <img src="assets/media/${prod.billede}" width="100px" /><br>
                            <b>Produkt Navn: ${prod.navn}</b><br>
                            <b>Producent: ${prod.producent}</b><br>
                            <b>pris: kr. ${prod.pris}<b><br>
                            Beskrivelse: ${prod.beskrivelse} 
                        </div>  
                        `;
            }, this);

        })
    })
        /*

        // TEORI!! -- Slet alle variabler der hedder noget med "forste".

        //data[0] // både "type" og "prod" (array)

        var forste_kategori = data[0];
        var forste_produkt = data[0].prod[0];

        // console.log("Første kategori:");
        // console.log(forste_kategori);

        console.log("Første produkts produkt_navn:");
        console.log(forste_produkt.navn)
        */

        // PSEUDO-KODE
        /*

        data.foreach (kategori) {
            console.log (kategori.type)
            data.foreach (produkt) {
                console.log (produkt.navn)
            }
        }



        */




        // content.innerHTML = data[0].produkt_navn + " " + data[0].producent_navn + " " + data[0].type_navn + " " + data[0].produkt_billede + " " + data[0].produkt_varenr + " " + data[0].produkt_pris;

