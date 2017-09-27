// opsætning for produkter på forsiden.

// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => { //når siden er loadet udføres koden neden under
        console.log('hej');
        hentData(0); //henter alt dataen
    });

})();

// Funktion som henter data til visning i content
// Funktionen har en parameter - hvis tallet nul hentes alt indhold, og hvis større end nul hentes kun denne ene kategori
function hentData(type = 0) {
    console.log("typen er:" + type);
    let url = 'http://localhost:1337/produkter';
    if (type > 0) {
        url += '/' + type; //vi har url så nu udviger vi url 
    }
    fetch(url) //henter json
        .then((response) => {  //response = arcrement  
            // grib svarets indhold (body) og send det som et json objekt til næste .then()
            console.log("response:", response)
            return response.json();
        })
        .then((data) => {
            // nu er json objektet lagt ind i data variablen, udskriv data

            // På Frontenden behøver man ikke at genstarte i konsollen

            console.log("Data: ");
            console.log(data);
            var type = '';
            document.getElementById('content').innerHTML = "";
            data.forEach(function (item) {
                console.log("Ny item:  ");
                console.log(item);
                if (type != item.kategori) {
                    document.getElementById('content').innerHTML += ``;
                    type = item.kategori;
                }
                document.getElementById('content').innerHTML += `
                        <div class="col-md-6"><br>
                        <img src="/assets/media/${item.produkt_billede}" width="60px" />
                        <b>${item.kategori_navn}</b>
                        <br><b>${item.produkt_navn}</b><br>
                        pris: kr. ${item.produkt_pris}<br>                            
                        </div><br>
                        `;

            })
        })
}
// slut på opsætning for produkter på forsiden.
