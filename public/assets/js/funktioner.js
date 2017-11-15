// Denne fil hedder med vilje bare "funktioner.js", da det er meningen, at den skal indeholde små hjælpefunktioner.
// Det er IKKE her, at man skal hente data fra API'er, databaser, osv.

// ========================================================

function hentAlleUrlParametre(url = "") {

    // Hvis man ikke giver den en specifik URL, så bruger den browserens aktuelle URL.
    if (url == "") url = window.location.href;

    url = url + "";  // Dette sørger for, at der arbejdes med en KOPI af teksten og ikke den oprindelige tekst.
    var urlParams = {};
    url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
            urlParams[$1] = $3;
        }
    );

    return urlParams;
}

    // ========================================================
