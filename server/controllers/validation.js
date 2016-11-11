module.exports = function (app,sanitizeHtml) {
    app.api.validationMethods = {};

    /*validate MLab ID*/
    app.api.validationMethods.validateMLabId = function (numeric) {
        var re = /^[0-9A-Fa-f]{16,32}$/;
        return re.test(numeric);
    };

    /*validateEmail*/
    app.api.validationMethods.validateEmail = function (userEmail) {
        if(userEmail){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(userEmail);
        }else{
            return false;
        }
    };
    /*validateNumeric*/
    app.api.validationMethods.validateNumeric = function (numeric) {
        var re = /^[0-9]{1,}$/;
        return re.test(numeric);
    };
    /*validateAlphaNumeric*/
    app.api.validationMethods.validateAlphaNumeric = function (alphanumeric) {
        if(alphanumeric){
            var re = /^[A-Za-z\d\s]+$/;
            return re.test(alphanumeric);
        }else{
            return false;
        }
    };
    /*validateAlpha*/
    app.api.validationMethods.validateAlpha = function (alpha) {
        if(alpha){
            var re = /^[a-zA-Z]+$/;
            return re.test(alpha);
        }else{
            return false;
        }
    };

    app.api.validationMethods.validateCellNumber = function (userMobile) {
        //var re =/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[./0-9]*$/g;
        if(userMobile){
            var re = /^[+]*[0-9]{10,15}$/;
            return re.test(userMobile);
        }else{
            return true;
        }
    };

    app.api.validationMethods.validateCellNumberNonEmpty = function (userMobile) {
        //var re =/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[./0-9]*$/g;
        if(userMobile){
            var re = /^[+]*[0-9]{10,15}$/;
            return re.test(userMobile);
        }else{
            return false;
        }
    };

    app.api.validationMethods.validateAlphaWithSpaces = function (alphawithspaces) {
        var re = /^[\w\-\s]+$/;
        return re.test(alphawithspaces);
    };
    app.api.validationMethods.validateAddress = function (address) {
        var re = /^\d+\w*\s*(?:[\-\/]?\s*)?\d*\s*\d+\/?\s*\d*\s*/;
        return re.test(address);
    };

    app.api.validationMethods.validateUrl = function (url) {
        if(url && url.indexOf('/w_250,h_250,c_thumb')>0){
            url = url.replace("/w_250,h_250,c_thumb/","/");
        }
        var re = /^((http[s]?|ftp):\/\/)?\/?([^:\/][\a-z.]+)((\/\w+)*\/)([\w\-\.]+[\a-z0-9]+)$/;
        return re.test(url);
    };

    app.api.validationMethods.validateStrings = function (data) {
        if(data){
            var newData = sanitizeHtml(data, {
                allowedTags: [],
                allowedAttributes: []
            });
            return newData && newData.length ? true:false;
        }else{
            return false;
        }
    };

    app.api.validationMethods.validateOptionalStrings = function (data) {
        if(data){
            var newData = sanitizeHtml(data, {
                allowedTags: [],
                allowedAttributes: []
            });
            return newData && newData.length ? true:false;
        }else{
            return true;
        }
    };


    app.api.validationMethods.validationMethodsTesting = function (req, res) {
        res.send(app.api.validationMethods.validateStrings(req.body.data));
    }

}