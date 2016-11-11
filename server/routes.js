module.exports = function (app, mongoose, moment, momentTimezone, Bcrypt, sanitizeHtml, Converter, multer, path, fs) {


    /**
     * GET HOME PAGE
     *
     * */
    app.get('/', function (req, res, next) {
        res.sendStatus(200);
    });
  
   /*----------------------------- Login Route ------------------------ */
    app.post('/login', app.api.User.login);

    app.post('/uploadAngularBeautyData', multer({dest: "./uploads/"}).array("uploads[]", 12),  app.api.User.uploadAngularBeautyData);

    app.post('/uploadPsc', multer({dest: "./uploads/"}).array("uploads[]", 12), app.api.User.uploadPsc);



    app.post('/getAngularBeautyData', app.api.User.getAngularBeautyData);

    // app.post('/upload' ,multer({ dest: './uploads/' }).single('files'), app.api.User.upload);




   
};