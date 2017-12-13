module.exports = (app) => {
    require('./users')(app);
    require('./login')(app);
    require('./products')(app);
};