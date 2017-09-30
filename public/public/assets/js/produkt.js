// Lytter på om der er klikket på knappen gem - herefter postes data som indsættes i databasen
document.querySelector('#gem').addEventListener('click', (event) => {
    console.log('event ok');
    event.preventDefault();
    let navn = document.querySelector('#navn').value;
    let type = document.querySelector('#type').value;
    let pris = document.querySelector('#pris').value;
    let billede = document.querySelector('#billede').value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"navn":"${navn}","type":"${type}","pris":"${pris}","billede":"${billede}" }`,
        cache: 'no-cache',
        mode: 'cors'
    };

    let request = new Request('http://localhost:1337/create', init);

    fetch(request)
        .then(response => { console.log(response) }).catch(err => { console.log(err) });

});