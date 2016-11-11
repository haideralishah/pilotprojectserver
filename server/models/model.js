module.exports = function (app, mongoose) {

    // /* User Basic Schema*/
    var attendanceSchema = new mongoose.Schema({
        HR_ID: { type: String, required: true },
        Name: { type: String, required: true },
        date: { type: Date, default: Date.now }
    });

    app.db.model('Attendance', attendanceSchema);

    var angularBeautyDataSchema = new mongoose.Schema({
        data: { type: Object, required: true },
        autherName: { type: String, required: true }
    });

    app.db.model('angularBeautyData', angularBeautyDataSchema);



    var pscSchema = new mongoose.Schema({
        AHT: { type: String, required: true, unique: true },
        AUX: { type: String, required: true, unique: true },
        Attendance: { type: String, required: true, unique: true },
        AvailTimeMin: { type: String, required: true, unique: true },
        Calls: { type: String, required: true, unique: true },
        FCR: { type: String, required: true, unique: true },
        FMName: { type: String, required: true, unique: true },
        FSName: { type: String, required: true, unique: true },
        FakeFCR: { type: String, required: true, unique: true },
        Fakecalls: { type: String, required: true, unique: true },
        Grade: { type: String, required: true, unique: true },
        HRID: { type: String, required: true, unique: true },
        HoldTime: { type: String, required: true, unique: true },
        Location: { type: String, required: true, unique: true },
        LoginTime: { type: String, required: true, unique: true },
        LoginTimeMin: { type: String, required: true, unique: true },
        Name: { type: String, required: true, unique: true },
        NotReady: { type: String, required: true, unique: true },
        NotReadyTimeMin: { type: String, required: true, unique: true },
        ObtainMarks: { type: String, required: true, unique: true },
        OrderFCR: { type: String, required: true, unique: true },
        Orders: { type: String, required: true, unique: true },
        Remarks: { type: String, required: true, unique: true },
        Repeated: { type: String, required: true, unique: true },
        RepeatedCall: { type: String, required: true, unique: true },
        Shift: { type: String, required: true, unique: true },
        Skill: { type: String, required: true, unique: true },
        TalkReservedMin: { type: String, required: true, unique: true },
        TalkTime: { type: String, required: true, unique: true },
        TalkTimeMin: { type: String, required: true, unique: true },
        Team: { type: String, required: true, unique: true },
        Total: { type: String, required: true, unique: true },
        Utilization: { type: String, required: true, unique: true },
        WrapTime: { type: String, required: true, unique: true },
        date: { type: Date, default: Date.now }
    });

    app.db.model('Psc', pscSchema);

};
