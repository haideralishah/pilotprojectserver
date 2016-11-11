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
            // if (!jsonObj.Name || !jsonObj.HR_ID) {
            //     console.log('Something is missing');
            // }
            // else if (!app.api.validationMethods.validateStrings(jsonObj.Name)) {
            //     console.log('Name is not string');
            // }
            // else if (!app.api.validationMethods.validateStrings(jsonObj.HR_ID)) {
            //     console.log('HR_ID is not string');
            // }
            // else {
            var JSONedData = new app.db.models.angularBeautyData({
                data: jsonObj,
                autherName: 'haider'
            });
            dataToSave.push(JSONedData);
            // }
        });
        converter.on("end_parsed", function (jsonArray) {
            // app.db.models.Attendance.find({
            // }, function (err, records) {
            //     if (err) {
            //         cb(records);
            //     } else if (records.length) {
            //         for (var i = 0, len = dataToSave.length; i < len; i++) {
            //             for (var j = 0, len2 = records.length; j < len2; j++) {
            //                 if (records[j] && records[j].HR_ID && dataToSave[i] && dataToSave[i].HR_ID && records[j].HR_ID == dataToSave[i].HR_ID) {
            //                     console.log('inner loop', j);
            //                     alreadyAdded.push(dataToSave[i]);
            //                     dataToSave.splice(i, 1);
            //                     i--;
            //                     len2 = records.length;
            //                 }
            //             }
            //         }
            app.db.models.angularBeautyData.create(dataToSave, function (err, saved) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    // res.send(saved);
                    cb();
                }
            });

            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });
            // app.db.models.Attendance.create(dataToSave, function (err, saved) {
            //     if (err) {
            //         console.log(err);
            //         cb(err);
            //     } else {
            //         cb(saved);
            //         fs.unlink(filePath, function (err) {
            //             if (err) return console.log(err);
            //             console.log('file deleted successfully');
            //         });
            //     }
            // });
            // } else {
            //     cb();
            //     fs.unlink(filePath, function (err) {
            //         if (err) return console.log(err);
            //         console.log('file deleted successfully');
            //     });
            // app.db.models.Attendance.create(dataToSave, function (err, saved) {
            //     if (err) {
            //         console.log(err);
            //         cb(err);
            //     } else {
            //         cb(saved);
            //         fs.unlink(filePath, function (err) {
            //             if (err) return console.log(err);
            //             console.log('file deleted successfully');
            //         });
            //     }
            //         // });
            //     }
            // })
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
        // res.end();

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
        // res.send({
        //     'dataToSave': 'dataToSave',
        //     'alreadyAdded': 'alreadyAdded',
        // });
    }



}