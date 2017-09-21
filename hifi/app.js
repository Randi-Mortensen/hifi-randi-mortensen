const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
const server = restify.createServer({
    'name': 'hifi',
    'version': '1.0.0'
});

server.use(restify.plugins.bodyParser());
const cors = corsmiddleware({ origins: ['*'] });
server.pre(cors.preflight);
server.use(cors.actual);

require('./routes/index')(server);

server.listen(1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});