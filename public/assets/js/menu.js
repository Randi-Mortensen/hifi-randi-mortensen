



// ========================================================





(() => {



    // Tilføjer en EventListener, der lytter på om browseren er færdig med at indlæse HTML'en

    document.addEventListener('DOMContentLoaded', function () {



        // Denne funktion er defineret i filen "js/menu.js"

        udskrivMenu();

    });

})();





// ========================================================





function udskrivMenu() {



    // Funktionen statiskKategorierData returnerer et JSON array indholdende kategorier.

    // Den bruges udelukkende til at holde eksemplet simpelt

    // og uafhængigt af API'er, databaser, osv.

    // Her kan du i stedet bruge en fetch().

    var kategorier_data = statisk_kategorier_data();



    // Henter en reference til HTML elementet #menu-links

    var menuLinks = document.querySelector("#menu-links");



    // Denne variabel fylder vi løbende links i (<li> og <a>)

    var html = "";



    // I dette eksempel bruges Attributten "data-id" til at highlighte det aktuelle menu-punkt.

    // Dette sker ikke automatisk bare fordi man giver attributten til linket.

    // Du kan se længere nede i koden, hvordan den bliver brugt.

    kategorier_data.forEach(function (element) {

        html += `<li><a data-id="${element.kategori_id}" href="produkter.html?kategoriID=${element.kategori_id}">${element.kategori_navn}</a></li>`;

        // console.log (`ID: ${element.kategori_id},  Navn: ${element.kategori_navn}`);

    });



    // Kopierer indholdet af html variablen til innerHTML egenskaben, dom tilhører <ul id="menu-links">

    menu - links.innerHTML = html;





    // --------------------------------------------------------





    // Følgende kode-blok highlighter det menu-punkt, som er aktuelt (hvis en kategori er valgt)





    // Henter et objekt med alle URL parametre.

    // Definitionen af hentAlleUrlParametre funktionen ligger i "js/funktioner.js"

    var alleUrlParametre = hentAlleUrlParametre();



    // Tjekker om kategoriID findes i URL'en

    if (alleUrlParametre.kategoriID !== undefined) {



        // Gemmer en kopi af kategoriID fra URL'en i vores egen variabel,

        // så vi slipper for at skrive "alleUrlParametre.kategoriID"

        let kategoriID = alleUrlParametre.kategoriID;



        // ------------------------



        // Henter en array med referencer til alle menu-punkterne

        let alleLinks = document.querySelectorAll("#menu-links a");



        // Sætter alle linksnes classes til ingenting,

        // så vi er sikre på, at vi ikke ender med at have 2 highlightede links

        alleLinks.forEach(function (element) {

            element.className = "";

        });



        // ------------------------



        // Genererer den selector der skal til, for at finde det aktuelle menu-punkt

        let selector = `#menu-links a[data-id='${kategoriID}']`;

        //console.log (`Selector: ${selector}`); // Test om selector'en er skrevet korrekt ved at logge den.



        // Henter en reference til det aktuelle menu-punkt (hvis en kategori er valgt)

        let aktuelleLink = document.querySelector(selector);



        // Tjekker om linket blev fundet

        if (aktuelleLink !== null) {

            // Sætter linkets class til "active".

            aktuelleLink.className = "active";

        }

    }

}





    // ========================================================


// // ========================================================

// (() => {

//     // Tilføjer en EventListener, der lytter på om browseren er færdig med at indlæse HTML'en
//     document.addEventListener('DOMContentLoaded', function () {

//         // Denne funktion er defineret i filen "assets/js/menu.js"
//         udskrivMenu();
//     });
// })();


// // ========================================================


// function udskrivMenu() {

//     // Funktionen statisk_kategorier_data returnerer et JSON array indholdende kategorier.
//     // Den bruges udelukkende til at holde eksemplet simpelt
//     // og uafhængigt af API'er, databaser, osv.
//     // Her kan du i stedet bruge en fetch().
//     var kategorier_data = statisk_kategorier_data();

//     // Henter en reference til HTML elementet #menu-links
//     var menu_links = document.querySelector("#menu-links");

//     // Denne variabel fylder vi løbende links i (<li> og <a>)
//     var html = "";

//     // I dette eksempel bruges Attributten "data-id" til at highlighte det aktuelle menu-punkt.
//     // Dette sker ikke automatisk bare fordi man giver attributten til linket.
//     // Du kan se længere nede i koden, hvordan den bliver brugt.
//     kategorier_data.forEach(function (element) {
//         html += `<li><a data-id="${element.type_id}" href="produkt.html?typeID=${element.type_id}">${element.type_navn}</a></li>`;
//         //console.log(`ID: ${element.kategori_id},  Navn: ${element.kategori_navn}`);
//     });

//     // Kopierer indholdet af html variablen til innerHTML egenskaben, dom tilhører <ul id="menu-links">
//     menu_links.innerHTML = html;


//     // --------------------------------------------------------


//     // Følgende kode-blok highlighter det menu-punkt, som er aktuelt (hvis en kategori er valgt)


//     // Henter et array med alle URL parametre.
//     // Definitionen af hentAlleUrlParametre funktionen ligger i "js/funktioner.js"
//     var alleUrlParametre = hentAlleUrlParametre();

//     // Tjekker om kategoriID findes i URL'en
//     if (alleUrlParametre.typeID !== undefined) {

//         // Gemmer en kopi af kategoriID fra URL'en i vores egen variabel,
//         // så vi slipper for at skrive "alleUrlParametre.kategoriID"
//         let typeID = alleUrlParametre.typeID;

//         // ------------------------

//         // Henter en array med referencer til alle menu-punkterne
//         let alle_links = document.querySelectorAll("#menu-links a");

//         // Sætter alle linksnes classes til ingenting,
//         // så vi er sikre på, at vi ikke ender med at have 2 highlightede links
//         alle_links.forEach(function (element) {
//             element.className = "";
//         });

//         // ------------------------

//         // Genererer den selector der skal til, for at finde det aktuelle menu-punkt
//         let selector = `#menu-links a[data-id='${typeID}']`;
//         //console.log (`Selector: ${selector}`); // Test om selector'en er skrevet korrekt ved at logge den.

//         // Henter en reference til det aktuelle menu-punkt (hvis en kategori er valgt)
//         let aktuelle_link = document.querySelector(selector);

//         // Tjekker om linket blev fundet
//         if (aktuelle_link !== null) {
//             // Sætter linkets class til "active".
//             aktuelle_link.className = "active";
//         }
//     }
// }


//     // ========================================================

