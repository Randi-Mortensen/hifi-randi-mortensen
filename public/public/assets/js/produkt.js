// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        hentData(0);
    });

})();

// Funktion som henter data til visning i content
// Funktionen har en parameter - hvis tallet nul hentes alt indhold, og hvis større end nul hentes kun denne ene kategori
function hentData(type = 0) {
    let url = 'http://localhost:1337/produkter';
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
                if (type != item.varenr) {
                    document.getElementById('content').innerHTML += `<h2>${item.varenr}</h2>`;
                    type = item.varenr;
                }
                document.getElementById('content').innerHTML += `
                        <div class="col-md-6">
                        <img src="assets/media/${item.billede}" width="60px" />
                           <br><b>${item.navn}</b><br>
                           producent: ${item.producent}<br>
                           kategori: ${item.kategori}<br>
                           Vare Nr.: ${item.varenr}<br>
                            pris: kr. ${item.pris}<br>
                            
                        </div>  
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
    let navn = document.querySelector('#navn').value;
    let producent = document.querySelector('#producent').value;
    let kategori = document.querySelector('#kategori').value;
    let billede = document.querySelector('#billede').value;
    let varenr = document.querySelector('#varenr').value;
    let pris = document.querySelector('#pris').value;
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
