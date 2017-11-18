// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// slet funktionen, bindes til hver slet knap efter alle produkterne er hentet
function sletItem(event) {
      if (confirm('Er du sikker?')) {
            let id = (isNaN(event.target.dataset['id']) ? 0 : event.target.dataset['id']);

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let init = {
                  method: 'delete',
                  headers: headers,
                  cache: 'no-cache'
            };
            let request = new Request(`http://localhost:3000/produkt/${id}`, init);

            fetch(request)
                  .then(response => {
                        if (response.status == 204) {
                              window.location.replace(`index.html`);
                        } else {
                              throw new Error('Produkt blev ikke slettet');
                        }
                  }).catch(err => {
                        console.log(err);
                  });
      }
}

document.addEventListener("DOMContentLoaded", event => {

      // forudfyld formular hvis der skal redigeres
      if (getParameterByName('action') == "edit") {
            let Id = (getParameterByName('id') != null ? getParameterByName('id') : 0);

            fetch(`http://localhost:3000/produkt/${Id}`)
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                  })
                  .then((json) => {

                        // erstat punktum med komma
                        let pris = json[0].pris;
                        pris = pris.replace('.', ',');

                        document.querySelector('#produktForm').innerHTML = `
               <h2>Rediger produkt</h2>
               <label>Produkt navn</label>
               <input type="text" name="produktNavn" id="Navn" value="${json[0].navn}">
               <br>
               <label>Produkt beskrivelse</label>
               <input type="text" name="Description" id="Description" value="${json[0].description}">
               <br>
               <label>Produkt pris</label>
               <input type="text" name="Pris" id="Pris" value="${pris}">
               <br>
   
               <button>Gem</button>
               <a href="index.html" class="button">Annuller</a> <span id="produktFormError" class="error"></span>
               <hr>`;

                        let produktFormButton = document.querySelector("#produktForm button");

                        produktFormButton.addEventListener('click', function (event) {
                              let navn = document.querySelector('#Navn').value; //husk og angiv om det er id eller class med # eller . foran
                              let description = document.querySelector('#Description').value;
                              let pris = document.querySelector('#Pris').value;
                              let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);

                              // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                              pris = pris.replace(',', '.');

                              if (id != 0 && navn != '' && description != '' && !isNaN(pris) && id > 0) {
                                    document.querySelector('#produktFormError').innerHTML = "";
                                    let url = `http://localhost:3000/produkt/${id}`;
                                    let headers = new Headers();
                                    headers.append('Content-Type', 'application/json');

                                    let init = {
                                          method: 'put',
                                          headers: headers,
                                          body: JSON.stringify({
                                                id: id,
                                                navn: navn,
                                                description: description,
                                                pris: pris
                                          }),
                                          cache: 'no-cache',
                                          cors: 'cors'
                                    };
                                    let request = new Request(url, init);

                                    fetch(request)
                                          .then(response => {

                                                if (response.status == 200) {
                                                      window.location.replace(`index.html`);
                                                } else {
                                                      throw new Error('Produkt blev ikke opdateret')
                                                }
                                          }).catch(err => {
                                                console.log(err);
                                          });

                              } else {
                                    document.querySelector('#produktFormError').innerHTML = "Udfyld venligst alle felter korrekt";
                              }
                        });
                  })
                  .catch((err) => {
                        console.log(err);
                  });

      } else {
            // vis tom formular til oprettelse af et produkt
            document.querySelector('#produktForm').innerHTML = `
         <h2>Opret nyt produkt</h2>
         <label>Produkt navn</label>
         <input type="text" name="produktNavn" id="Navn" value="">
         <br>
         <label>Produkt beskrivelse</label>
         <input type="text" name="produktDescription" id="Description" value="">
         <br>
         <label>Produkt pris</label>
         <input type="text" name="produktPris" id="Pris" value="">
         <br>
         
         <button>Gem</button>
         <a href="index.html" class="button">Annuller</a> <span id="produktFormError" class="error"></span>
         <hr>`;


            // bind gem funktionen til knappen
            let produktFormButton = document.querySelector("#produktForm button");
            produktFormButton.addEventListener('click', function (event) {
                  let navn = document.querySelector('#Navn').value;
                  let description = document.querySelector('#Description').value;
                  let pris = document.querySelector('#Pris').value;

                  // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                  pris = pris.replace(',', '.');

                  if (navn != '' && description != '' && !isNaN(pris)) {
                        document.querySelector('#produktFormError').innerHTML = "";
                        let url = `http://localhost:3000/produkt/`;
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');

                        let init = {
                              method: 'post',
                              headers: headers,
                              body: JSON.stringify({
                                    navn: navn,
                                    description: description,
                                    pris: pris
                              }),
                              cache: 'no-cache'
                        };
                        let request = new Request(url, init);

                        fetch(request)
                              .then(response => {
                                    // hvis gem handlingen gik fejlfrit igennem, reloades siden
                                    if (response.status == 200) {
                                          window.location.replace(`index.html`);
                                    } else {
                                          throw new Error('Produkt blev ikke oprettet');
                                    }
                              })
                              .catch(err => {
                                    console.log(err);
                              });
                  } else {
                        document.querySelector('#produktFormError').innerHTML = "Udfyld venligst alle felter korrekt";
                  }

            });
      }

      // hent alle produkter og udskriv listen
      fetch('http://localhost:3000/produkt')
            .then((response) => {
                  if (response.ok) {
                        return response.json();
                  }
            })
            .then((json) => {
                  let list = `
            <table>
               <tr>
                  <th></th>
                  <th>id</th>
                  <th>navn</th>
                  <th>pris</th>
               </tr>`;

                  for (let i = 0; i < json.length; i++) {
                        let pris = json[i].pris;
                        pris = pris.replace('.', ',');
                        list += `
               <tr>
                  <td>
                     <a href="?action=edit&id=${json[i].id}" class="button edit">ret</a>
                     <a href="#" class="button delete" data-id="${json[i].id}">slet</a>
                  </td>
                  <td>${json[i].produkt_id}</td>
                  <td>${json[i].produkt_navn}</td>
                  <td style="text-align:right">${pris}</td >  
               </tr > `;
                  }

                  list += `</table > <hr>`;

                  document.querySelector('#produktList').innerHTML = list;

                  // lokaliser alle slet knapper, og tilføj en slet funktion
                  let deleteButtons = document.querySelectorAll('#produktList a.delete');
                  deleteButtons.forEach((button) => {
                        button.addEventListener('click', sletItem);
                  })
            })
            .catch((err) => {
                  console.log(err);
            })
});