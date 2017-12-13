const restify = require('restify');
const corsmiddleware = require('restify-cors-middleware');
const path = require('path');

const port = process.env.port || 3000;

const app = restify.createServer({
    name: 'hifi2',
    version: '1.0.0'
});

const logger = require('morgan');
app.use(logger('dev'));
const cors = corsmiddleware({
    origins: ['*']
});
app.pre(cors.preflight);
app.use(cors.actual);



app.use(restify.plugins.acceptParser(app.acceptable));
// bodyparser skal vide hvor billederne skal placeres 
app.use(restify.plugins.bodyParser({
    mapParms: true,
    mapFiles: true,
    keepExtensions: true,
    uploadDir: './api/tmp_upload'
}));
app.use(restify.plugins.queryParser());

require(path.join(__dirname, 'routes', 'index'))(app);

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log('========================================================================================');
    console.log('%s is listening on port %s, address: %s', app.name, port, 'http://localhost:' + port);
});