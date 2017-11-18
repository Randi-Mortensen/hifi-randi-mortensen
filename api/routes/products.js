const restify = require('restify');
const path = require('path'); // benyttes til at tjekke fil endelser 
const fs = require('fs'); // benyttes til at flytte og slette filer
const mysql = require(path.join(__dirname, '..', 'config', 'mysql'));

module.exports = (app) => {

   // route til at servere billederne til klienten
   app.get('/images/:name', (req, res, next) => {
      // det er kun jpg eller png filer jeg ønsker at tillade adgang til her
      if (path.extname(req.params.name) == '.jpg' || path.extname(req.params.name) == '.png') {
         // forsøg at læs billede filen fra images mappen...
         fs.readFile('./api/images/' + req.params.name, function (err, file) {
            if (err) {
               // den ønskede fil blev ikke fundet, vi sender standard "no-image.png" i stedet
               // dette kunne også have været en res.json(404) 
               fs.readFile('./api/images/no-image.png', (err2, default_file) => {
                  res.writeHead(200);
                  res.write(default_file);
                  res.end();
               });

            } else {
               // her kunne der skaleres "on-the-fly" ... det tager vi en anden dag
               res.writeHead(200);
               res.write(file);
               res.end();
            }
         });
      } else {
         // hvis den ønskede fil ikke er en .jpg eller .png, 
         // sendes no-image som standard eller res.json(404)
         res.json(404);
         // fs.readFile('./api/images/no-image.png', (err, default_file) => {
         //    res.writeHead(200);
         //    res.write(default_file);
         //    res.end();
         // });
      }
   });


   app.get('/products', (req, res, next) => {
      let db = mysql.connect();
      db.execute(`SELECT * FROM products`, [], (err, rows) => {
         if (err) {
            console.log(err);
         } else {
            res.json(200, rows);
         }
      })
      db.end();
   });


   app.get('/products/:id', (req, res, next) => {
      let id = (isNaN(req.params.id) ? 0 : req.params.id);
      if (id > 0) {
         let db = mysql.connect();
         db.execute(`SELECT * FROM products WHERE product_id = ?`, [req.params.id], (err, rows) => {
            if (err) {
               console.log(err);
            } else {
               res.json(200, rows);
            }
         })
         db.end();
      } else {
         res.json(400, {
            message: 'id ikke valid'
         });
      }
   });


   app.post('/products', (req, res, next) => {
      let name = (req.body.productName == undefined ? '' : req.body.productName);
      let description = (req.body.productDescription == undefined ? '' : req.body.productDescription);
      let price = (req.body.productPrice == undefined ? 0 : req.body.productPrice);
      price = price.replace(',', '.');

      // sæt et standard billede, i tilfælde hvor der ikke er sendt et billede med opret formularen
      let image = 'no-image.png';

      if (name != '' && description != '' && !isNaN(price)) {
         // håndter billedet, hvis der er sendt et billede 
         if (req.files.productImage.name != '') {
            image = req.files.productImage.name;

            // flyt den uploadede midlertidige fil til billede mappen
            var temp_image = fs.createReadStream('./' + req.files.productImage.path); // input stream
            var final_image = fs.createWriteStream('./api/images/' + image); // output stream
            temp_image.pipe(final_image); // flyt data fra temp til final
            temp_image.on('end', function () {
               // slet den midlertidige fil, når "final_image" er oprettet  
               fs.unlink('./' + req.files.productImage.path);
            });
         } else {
            // denne er nødvendig, pga en tom fil bliver lagt i uploadmappen hver gang formularen sendes.
            fs.unlink('./' + req.files.productImage.path);
         }

         let db = mysql.connect();
         db.execute(`INSERT INTO products SET product_name = ?, product_description = ?, product_price = ? , product_image = ?`, [name, description, price, image], (err, rows) => {
            if (err) {
               console.log(err);
            } else {
               res.json(200, rows);
            }
         })
         db.end();
      } else {
         res.json(400, {
            message: 'validering fejlede'
         });
      }
   });


   app.put('/products/:id', (req, res, next) => {
      let name = (req.body.productName == undefined ? '' : req.body.productName);
      let description = (req.body.productDescription == undefined ? '' : req.body.productDescription);
      let price = (req.body.productPrice == undefined ? 0 : req.body.productPrice);
      let id = (isNaN(req.params.id) ? 0 : req.params.id);
      price = price.replace(',', '.');
      let image = req.body.oldProductImage;

      if (name != '' && description != '' && !isNaN(price) && id > 0) {

         // håndter billedet, hvis der er sendt et billede 
         if (req.files.productImage.name != '') {

            // gem det nye nan
            image = req.files.productImage.name;

            // flyt den uploadede midlertidige fil til billede mappen 
            var temp_image = fs.createReadStream('./' + req.files.productImage.path); // input stream
            var final_image = fs.createWriteStream('./api/images/' + image); // output stream
            temp_image.pipe(final_image);
            temp_image.on('end', function () {
               // slet den midlertidige fil, når "final_image" er oprettet  
               fs.unlink('./' + req.files.productImage.path);
               // slet det gamle billede
               // SUPER MEGET OBS PÅ AT DETTE ÅBNER OP FOR SLETNING AF ALLE FILER!!!!
               // DERFOR ET HURTIGT TJEK PÅ FILENDELSEN HVOR KUN JPG OG PNG MÅ SLETTES 
               if (req.body.oldProductImage != 'no-image.png') {
                  if (path.extname(req.body.oldProductImage) == '.jpg' || path.extname(req.body.oldProductImage) == '.png') {
                     let image_file = './api/images/' + req.body.oldProductImage;
                     if (fs.existsSync(image_file)) {
                        fs.unlinkSync(image_file);
                     }
                  }
               }
            });
         } else {
            // denne er nødvendig, pga en tom fil bliver lagt i uploadmappen hver gang formularen sendes...  
            fs.unlink('./' + req.files.productImage.path);
         }


         let db = mysql.connect();
         db.execute(`UPDATE products SET product_name = ?, product_description = ?, product_price = ?, product_image = ?  WHERE product_id = ?`, [name, description, price, image, id], (err, rows) => {
            if (err) {
               console.log(err);
            } else {
               res.json(200, rows);
            }
         })
         db.end();
      } else {
         res.json(400, {
            message: 'validering fejlede'
         });
      }
   });


   app.del('/products/:id', (req, res, next) => {
      let id = (isNaN(req.params.id) ? 0 : req.params.id);
      if (id > 0) {
         let db = mysql.connect();
         // for at kunne slette billede filen der er knyttet til produktet,
         // skal navnet hentes ud af databasen før det hele slettes fra databasen
         db.execute(`SELECT product_image FROM products WHERE product_id = ?`, [req.params.id], (err, rows) => {
            // tjek at billedet ikke er "no-image.png"
            if (rows[0].product_image != undefined && rows[0].product_image != 'no-image.png') {
               let image_file = './api/images/' + rows[0].product_image;
               if (fs.existsSync(image_file)) {
                  fs.unlink(image_file);
               }
            }

            let db = mysql.connect();
            db.execute(`DELETE FROM products WHERE product_id = ?`, [req.params.id], (err, rows) => {
               if (err) {
                  console.log(err);
               } else {
                  res.json(204);
               }
            })
            db.end();

         });
         db.end();

      } else {
         res.json(400, {
            message: 'id ikke valid'
         });
      }
   });




   // ========================== static
   app.get('/.*', restify.plugins.serveStatic({
      'directory': 'public',
      'default': 'index.html'
   }));
}