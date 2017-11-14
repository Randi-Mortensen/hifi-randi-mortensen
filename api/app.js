const restify = require('restify');
const path = require('path');

const port = process.env.port || 3000;

const app = restify.createServer({
   name: 'Administrations Panel Eksempel',
   version: '1.0.0'
});

const logger = require('morgan');
app.use(logger('dev'));

app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

require(path.join(__dirname, 'routes', 'index'))(app);

app.listen(port, function (err) {
   if (err) console.log(err);
   console.log('========================================================================================');
   console.log('%s is listening on port %s, address: %s', app.name, port, 'http://localhost:' + port);
});