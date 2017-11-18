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
            let request = new Request(`http://localhost:3000/products/${id}`, init);

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

function opdaterProdukt(event) {
      event.preventDefault();
      let name = document.querySelector('#productName').value;
      let description = document.querySelector('#productDescription').value;
      let price = document.querySelector('#productPrice').value;
      let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);

      // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
      price = price.replace(',', '.');

      if (id != 0 && name != '' && description != '' && !isNaN(price) && id > 0) {
            document.querySelector('#productsFormError').innerHTML = "";

            // grib formularen og håndter indholdet via FormData objektet
            let form = document.querySelector('form')
            let data = new FormData(form);

            // ingen headers sendes med, browseren sætter automatisk de korrekte headers alt efter formens indhold
            let init = {
                  method: 'put',
                  body: data,
                  cache: 'no-cache'
            };

            let request = new Request(`http://localhost:3000/products/${id}`, init);

            fetch(request)
                  .then(response => {
                        console.log(response);
                        if (response.status == 200) {
                              window.location.replace(`index.html`);
                        } else {
                              throw new Error(`Produkt blev ikke opdateret: ${response.statusText}`)
                        }
                  }).catch(err => {
                        console.log(err);
                  });

      } else {
            document.querySelector('#productsFormError').innerHTML = "Udfyld venligst alle felter korrekt";
      }
}

function opretProdukt(event) {
      event.preventDefault();
      let name = document.querySelector('#productName').value;
      let description = document.querySelector('#productDescription').value;
      let price = document.querySelector('#productPrice').value;
      // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
      price = price.replace(',', '.');
      // 
      // let image = document.querySelector('#productImage');

      if (name != '' && description != '' && !isNaN(price)) {
            document.querySelector('#productsFormError').innerHTML = "";

            // grib formularen og håndter indholdet via FormData objektet
            let form = document.querySelector('form');
            let data = new FormData(form);

            // ingen headers sendes med, browseren sætter automatisk de korrekte headers alt efter formens indhold
            let init = {
                  method: 'post',
                  body: data,
                  cache: 'no-cache'
            };

            let request = new Request(`http://localhost:3000/products`, init);

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
            document.querySelector('#productsFormError').innerHTML = "Udfyld venligst alle felter korrekt";
      }

}

document.addEventListener("DOMContentLoaded", event => {

      // forudfyld formular hvis der skal redigeres
      if (getParameterByName('action') == "edit") {
            let productId = (getParameterByName('id') != null ? getParameterByName('id') : 0);

            fetch(`http://localhost:3000/products/${productId}`)
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                  })
                  .then((json) => {

                        // erstat punktum med komma
                        let price = json[0].product_price;
                        price = price.replace('.', ',');

                        document.querySelector('#productForm').innerHTML = `
               <h2>Rediger produkt</h2>
               <form enctype="multipart/form-data">
                  <div class="form-field">
                     <label>Produkt navn</label>
                     <input type="text" name="productName" id="productName" value="${json[0].product_name}">
                  </div>

                  <div class="form-field">
                     <label>Produkt beskrivelse</label>
                     <input type="text" name="productDescription" id="productDescription" value="${json[0].product_description}">
                  </div>

                  <div class="form-field">
                     <label>Produkt pris</label>
                     <input type="text" name="productPrice" id="productPrice" value="${price}">
                  </div>
               
                  <div class="form-field">
                     <label>Nuværende Billede</label>
                     <img src="http://localhost:3000/images/${json[0].product_image}/" alt="henter billede">
                  </div>
               
                  <div class="form-field">
                     <label>Upload Nyt Billede</label>
                     <input type="hidden" name="oldProductImage" id="oldProductImage" value="${json[0].product_image}">
                     <input type="file" name="productImage" id="productImage" value="">
                  </div>

                  <button class="save">Gem</button>
                  <a href="index.html" class="button cancel">Annuller</a> <span id="productsFormError" class="error"></span>
               </form>
               <hr>`;

                        // bind gem funktionen til knappen
                        document.querySelector("#productForm button").addEventListener('click', opdaterProdukt);

                  })
                  .catch((err) => {
                        console.log(err);
                  });

      } else {
            // vis tom formular til oprettelse af et produkt
            document.querySelector('#productForm').innerHTML = `
         <form enctype="multipart/form-data">
            <h2>Opret nyt produkt</h2>
            <div class="form-field">
               <label>Produkt navn</label>
               <input type="text" name="productName" id="productName" value="">
            </div>

            <div class="form-field">
               <label>Produkt beskrivelse</label>
               <input type="text" name="productDescription" id="productDescription" value="">
            </div>

            <div class="form-field">
               <label>Produkt pris</label>
               <input type="text" name="productPrice" id="productPrice" value="">
            </div>

            <div class="form-field">
               <label>Produkt Billede</label>
               <input type="file" name="productImage" id="productImage" value="">
            </div>
            
            <button class="save">Gem</button>
            <a href="index.html" class="button cancel">Annuller</a> <span id="productsFormError" class="error"></span>
         </form>
         <hr>`;

            // bind gem funktionen til knappen
            document.querySelector("#productForm button").addEventListener('click', opretProdukt);

      }

      // hent alle produkter og udskriv listen
      fetch('http://localhost:3000/products')
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
                  <th>Billede</th>
               </tr>`;

                  for (let i = 0; i < json.length; i++) {
                        let price = json[i].product_price;
                        price = price.replace('.', ',');
                        list += `
               <tr>
                  <td>
                     <a href="?action=edit&id=${json[i].product_id}" class="button edit">ret</a>
                     <a href="#" class="button delete" data-id="${json[i].product_id}">slet</a>
                  </td>
                  <td>${json[i].product_id}</td>
                  <td>${json[i].product_name}</td>
                  <td style="text-align:right">${price}</td>  
                  <td><img src="http://localhost:3000/images/${json[i].product_image}/" alt="henter billede"></td>
               </tr>`;
                  }

                  list += `</table><hr>`;

                  document.querySelector('#productsList').innerHTML = list;

                  // lokaliser alle slet knapper, og tilføj en slet funktion
                  let deleteButtons = document.querySelectorAll('#productsList a.delete');
                  deleteButtons.forEach((button) => {
                        button.addEventListener('click', sletItem);
                  })
            })
            .catch((err) => {
                  console.log(err);
            })
});