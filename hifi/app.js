const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
const server = restify.createServer({
    'name': 'hifi', //key : value
    'version': '1.0.0' //key : value
});

server.use(restify.plugins.bodyParser()); //bruges ved kontaktformularer.
const cors = corsmiddleware({ origins: ['*'] }); //orgins styrer hvilke domæner der har adgang.
server.pre(cors.preflight);
server.use(cors.actual);

require('./routes/index')(server);

server.listen(1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});