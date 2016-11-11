module.exports = function (app, mongoose, moment, momentTimezone, Bcrypt, sanitizeHtml, Converter, multer, path, fs) {
    app.api.User = {};

    // function testing(callerName,callerNumber,callerType){
    //     res.send('wow');
    // }




    /*----------------------------- Login Route ------------------------ */
    app.api.User.login = function (req, res, next) {
        if (req.body.userName == 'admin' && req.body.password == '12345') {
            res.send('Authenticated for admin');
        }
        else {
            res.send('You provided wrong credentials');
        }
    }
    var dataToSave = [];
    var alreadyAdded = [];



    app.api.User.uploadAngularBeautyData = function (req, res, next) {
        saveDataToMongoDB(req.files, function () {
            res.send({
                'dataToSave': dataToSave,
                'alreadyAdded': alreadyAdded,
            });
            dataToSave = [];
            alreadyAdded = [];
        })
    }





    function saveDataToMongoDB(file, cb) {
        var converter = new Converter({});
        converter.on("record_parsed", function (jsonObj) {
            var JSONedData = new app.db.models.angularBeautyData({
                data: jsonObj,
                autherName: 'haider'
            });
            dataToSave.push(JSONedData);
        });
        converter.on("end_parsed", function (jsonArray) {
            app.db.models.angularBeautyData.create(dataToSave, function (err, saved) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    cb();
                }
            });

            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });

        });
        var filePath = path.join(file[0].destination, file[0].filename);
        fs.createReadStream(filePath).pipe(converter);
    }
    app.api.User.saveAttendance = function (req, res, next) {
        app.db.models.Attendance.create(req.body, function (err, saved) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(saved);
            }
        });
    }







    app.api.User.uploadAngularSchool = function (req, res, next) {
        saveDataToMongoDBSchool(req.files, function () {
            res.send({
                'dataToSave': dataToSave,
                'alreadyAdded': alreadyAdded,
            });
            dataToSave = [];
            alreadyAdded = [];
        })
    }

    function saveDataToMongoDBSchool(file, cb) {
        var converter = new Converter({});
        converter.on("record_parsed", function (jsonObj) {
            var JSONedData = new app.db.models.angularSchoolData({
                data: jsonObj,
                autherName: 'haider'
            });
            dataToSave.push(JSONedData);
        });
        converter.on("end_parsed", function (jsonArray) {
            app.db.models.angularSchoolData.create(dataToSave, function (err, saved) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    cb();
                }
            });

            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });

        });
        var filePath = path.join(file[0].destination, file[0].filename);
        fs.createReadStream(filePath).pipe(converter);
    }




    app.api.User.uploadPsc = function (req, res, next) {
        savePscToMongoDB(req.files, function () {
            res.send({
                'dataToSave': dataToSave,
                'alreadyAdded': alreadyAdded,
            });
            dataToSave = [];
            alreadyAdded = [];
        })
    }
    function savePscToMongoDB(file, cb) {
        var converter = new Converter({});
        converter.on("record_parsed", function (jsonObj) {
            dataToSave.push(jsonObj);
        });
        converter.on("end_parsed", function (jsonArray) {
            cb();
            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });

        });
        var filePath = path.join(file[0].destination, file[0].filename);
        fs.createReadStream(filePath).pipe(converter);
    }



    app.api.User.getAngularBeautyData = function (req, res, next) {
        console.log(req.body, '11111111111111111111111111111111111111111111111111111111111111111111111');
        app.db.models.angularBeautyData.findOne(function (err, record) {
            if (err) {
                res.send({
                    errorMessage: err
                });
            } else {
                res.send({
                    record
                });
            }
        })
    }


    app.api.User.getAngularSchoolData = function (req, res, next) {
        console.log(req.body, '11111111111111111111111111111111111111111111111111111111111111111111111');
        app.db.models.angularSchoolData.findOne(function (err, record) {
            if (err) {
                res.send({
                    errorMessage: err
                });
            } else {
                res.send({
                    record
                });
            }
        })
    }


}