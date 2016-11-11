module.exports = function (app, mongoose) {
    require('./config')(app, mongoose);
    require('./constants')(app);
};