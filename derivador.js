/*
var fs = require('fs');
fs.readFile('/home/andres/Instalaciones/BiciPlay7/configuracion.txt', 'utf8', function(err, data) {
    if( err ){
        console.log(err)
    }
    else{
        console.log(data);
    }
});
*/


var fs = require('fs');
var path = require('path');
var LIST_FILE_CONFIG = path.join('ArbolVariabilidad', 'configs', 'default.config');
var JS_FILE_CONFIG = path.join('public', 'app', 'global', 'Config.js');
var CONFIG_TAMPLATE = "angular.module('app').constant('Config', <JSON>);";
fs.readFile(LIST_FILE_CONFIG, 'utf8', function(err, configData) {

    var featuresList = configData.toString().split('\n');
    console.log("featuresList:", featuresList);

    var features = {};

    for (i = 0; i < featuresList.length; i++) {
        features[featuresList[i]] = true;
    }

    if (features.IngresoApp) {
        console.log("objeto", features);
    }

    fs.writeFile(JS_FILE_CONFIG, CONFIG_TAMPLATE.replace("<JSON>", JSON.stringify(features)), function(err) {
        if (err) { // if error, report
            console.log(err);
        }
        console.log("Finished");
    });
});
