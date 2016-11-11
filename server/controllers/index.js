module.exports = function (app, mongoose, moment, momentTimezone, Bcrypt, sanitizeHtml, Converter, multer, path, fs) {

    app.api = {};

    require('./controller.js')(app, mongoose, moment, momentTimezone, Bcrypt, sanitizeHtml, Converter, multer, path, fs);
    require('./validation')(app, sanitizeHtml);
};