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
               <label>Produkt navn</label>
               <input type="text" name="productName" id="productName" value="${json[0].product_name}">
               <br>
               <label>Produkt beskrivelse</label>
               <input type="text" name="productDescription" id="productDescription" value="${json[0].product_description}">
               <br>
               <label>Produkt pris</label>
               <input type="text" name="productPrice" id="productPrice" value="${price}">
               <br>
   
               <button>Gem</button>
               <a href="index.html" class="button">Annuller</a> <span id="productsFormError" class="error"></span>
               <hr>`;

                        let productFormButton = document.querySelector("#productForm button");

                        productFormButton.addEventListener('click', function (event) {
                              let name = document.querySelector('#productName').value;
                              let description = document.querySelector('#productDescription').value;
                              let price = document.querySelector('#productPrice').value;
                              let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);

                              // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                              price = price.replace(',', '.');

                              if (id != 0 && name != '' && description != '' && !isNaN(price) && id > 0) {
                                    document.querySelector('#productsFormError').innerHTML = "";
                                    let url = `http://localhost:3000/products/${id}`;
                                    let headers = new Headers();
                                    headers.append('Content-Type', 'application/json');

                                    let init = {
                                          method: 'put',
                                          headers: headers,
                                          body: JSON.stringify({
                                                id: id,
                                                name: name,
                                                description: description,
                                                price: price
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
                                    document.querySelector('#productsFormError').innerHTML = "Udfyld venligst alle felter korrekt";
                              }
                        });
                  })
                  .catch((err) => {
                        console.log(err);
                  });

      } else {
            // vis tom formular til oprettelse af et produkt
            document.querySelector('#productForm').innerHTML = `
         <h2>Opret nyt produkt</h2>
         <label>Produkt navn</label>
         <input type="text" name="productName" id="productName" value="">
         <br>
         <label>Produkt beskrivelse</label>
         <input type="text" name="productDescription" id="productDescription" value="">
         <br>
         <label>Produkt pris</label>
         <input type="text" name="productPrice" id="productPrice" value="">
         <br>
         
         <button>Gem</button>
         <a href="index.html" class="button">Annuller</a> <span id="productsFormError" class="error"></span>
         <hr>`;


            // bind gem funktionen til knappen
            let productFormButton = document.querySelector("#productForm button");
            productFormButton.addEventListener('click', function (event) {
                  let name = document.querySelector('#productName').value;
                  let description = document.querySelector('#productDescription').value;
                  let price = document.querySelector('#productPrice').value;

                  // erstat komma med punkt, så isNaN funktionen fungerer hensigtsmæssigt
                  price = price.replace(',', '.');

                  if (name != '' && description != '' && !isNaN(price)) {
                        document.querySelector('#productsFormError').innerHTML = "";
                        let url = `http://localhost:3000/products/`;
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');

                        let init = {
                              method: 'post',
                              headers: headers,
                              body: JSON.stringify({
                                    name: name,
                                    description: description,
                                    price: price
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
                        document.querySelector('#productsFormError').innerHTML = "Udfyld venligst alle felter korrekt";
                  }

            });
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