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
                    document.getElementById('content').innerHTML += `<h2>${item.kategori_navn}</h2>`;
                    type = item.kategori;
                }
                document.getElementById('content').innerHTML += `
                        <div class="col-md-6">
                        <img src="/assets/media/${item.produkt_billede}" width="60px" />
                           <br><b>${item.produkt_navn}</b><br>
                           producent: ${item.producent_navn}<br>
                           kategori: ${item.kategori_navn}<br>
                           varenr: ${item.produkt_varenr}<br>
                            pris: kr. ${item.produkt_pris}<br>                            
                        </div><br>
                        `;

            })
        })
}
document.querySelector('#selecttype').addEventListener('change', (event) => {
    let obj = document.querySelector('#selecttype');
    hentData(obj.value);
})

// Lytter på om der er klikket på knappen gem - herefter postes data som indsættes i databasen
document.querySelector('#gem').addEventListener('click', (event) => {
    console.log('event ok');
    event.preventDefault();
    let produkt_navn = document.querySelector('#navn').value;
    let producent_navn = document.querySelector('#producent').value;
    let kategori_navn = document.querySelector('#kategori').value;
    let produkt_billede = document.querySelector('#billede').value;
    let produkt_varenr = document.querySelector('#varenr').value;
    let produkt_pris = document.querySelector('#pris').value;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    let init = {
        method: 'POST',
        headers: headers,
        body: `{"navn":"${navn}","producent":"${type}","kategori":"${type}","billede":"${billede}","varenr":"${varenr}","pris":"${pris}"}`,
        cache: 'no-cache',
        mode: 'cors'

    };

    let request = new Request('http://localhost:1337/create', init);

    fetch(request)
        .then(response => { console.log(response) }).catch(err => { console.log(err) });

});
