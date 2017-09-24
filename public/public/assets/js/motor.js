(function () {
    const getUrlParameter = function (sParam) {
        const sPageURL = decodeURIComponent(window.location.search.substring(1));
        const sURLVariables = sPageURL.split('&');
        let sParameterName;
        for (let int = 0; int < sURLVariables.length; int = int + 1) {
            sParameterName = sURLVariables[int].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    const visEtProduct = function (varenr) {
        const placeholder = document.querySelector('.myDiv');
        fetch('./assets/data/cheese.json')
            .then(function (result) {
                return result.json();
            })
            .then(function (cheeses) {
                const article = document.createElement('ARTICLE');
                cheeses.forEach(function (cheese) {
                    if (cheese.varenr == varenr) {

                        const navn = document.createElement('H2');
                        const navnOst = document.createTextNode(cheese.navn);
                        navn.appendChild(navnOst);

                        const pris = document.createElement('P');
                        const prisOst = document.createTextNode('Kr.' + cheese.pris);

                        const img = document.createElement('IMG');
                        img.setAttribute('src', './assets/media/' + cheese.beskrivelse.billede);

                        pris.appendChild(prisOst);

                        article.appendChild(navn);
                        article.appendChild(img);
                        article.appendChild(pris);
                        // placeholder.appendChild(article); //kaldes paints
                    }

                });
                return article;

            })
            .then(function (article) {
                placeholder.appendChild(article);
            });

        const visAlleOste = function () {
            const placeholder = document.querySelector('.myDiv');
            fetch('./assets/data/cheese.json')
                .then(function (result) {
                    return result.json();
                })
                .then(function (cheeses) {
                    const article = document.createElement('ARTICLE');
                    cheese.forEach(function (cheese) {
                        const paragraph = document.createElement('P');
                        const ancor = document.createElement('A');
                        const tekst = document.createTextNode(cheese.navn);
                        anchor.setAttribute('href', '?ost=' + cheese.varenr);
                        anchor.appendChild(tekst);
                        paragraph.appendChild(anchor);
                        article.appendChild(paragraph);
                    });
                    return article;
                })
                .then(function (article) {
                    placeholder.appendChild(article);
                });
        };

        document.addEventListener('DOMContentLoaded', function () {
            if (getUrlParameter('ost')) {
                visEnOst(getUrlParameter('ost'));
            } else {
                visAlleOste(getUrlParameter('ost'));
            }
        });
        // const paragraph = document.createElement('P');
        // const tekst = document.createTextNode('Hej Verden');
        // paragraph.appendChild(tekst);
        // placeholder.appendChild(paragraph);
    };
})();