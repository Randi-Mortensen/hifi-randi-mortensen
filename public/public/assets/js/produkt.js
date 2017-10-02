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

