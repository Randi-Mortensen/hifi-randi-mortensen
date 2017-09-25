const produkter = require('../data/produkter');
/**
 * @module produkter
 */
module.exports = {
    /**
     * getAll
     * Retunerer et json object med alle produkter fra kartoteket
     * @returns {Object}
     */
    'getAll': () => produkter,

    /**
     * getOne
     * Retunerer et json object med et enkelt produkt fra kartoteket
     * @param {string} varenr - varenummeret på et produkt
     * @returns {Object}
     */
    'getOne': (varenr) => {
        let currentKategori = null;
        produkter.forEach((kategori) => {
            if (kategori.varenr == varenr) {
                currentKategori = JSON.stringify(kategori);
            }
        });

        if (currentKategori !== null) {
            return currentKategori;
        } else {
            return {
                "code": "ResourceNotFound",
                "message": "${varenr} does not exist"
            };
        }
    }
};

// server.post('/hifi', (req, res) => {
//     res.send(200, req.body);
// });
// };
// }
// };