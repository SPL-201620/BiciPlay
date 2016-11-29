var fs = require('fs');
var path = require('path');
var LIST_FILE_CONFIG = path.join('ArbolVariabilidad', 'configs', 'default.config');
var JS_FILE_CONFIG = path.join('public', 'app', 'global', 'Config.js');
var CONFIG_TAMPLATE = "angular.module('app').constant('Config', <JSON>);";

var APP_FOLDER = path.join('app', 'controllers');




fs.readFile(LIST_FILE_CONFIG, 'utf8', function(err, configData) {

    var featuresList = configData.toString().split('\n');
    console.log("featuresList:", featuresList);

    var features = {};

    for (i = 0; i < featuresList.length; i++) {
        features[featuresList[i]] = true;
    }


    derivarInterfaz(features);
    derivarReportes(true/*features.Reportes*/);

    if (features.IngresoApp) {
        console.log("objeto", features);
    }

});

function derivarInterfaz(features) {
    fs.writeFile(JS_FILE_CONFIG, CONFIG_TAMPLATE.replace("<JSON>", JSON.stringify(features)), function(err) {
        if (err) {
            console.log(err);
        }
        console.log("OK: Interfaz");
    });
}

function derivarReportes(activado) {
    var fileList = [];
    var CODE_TEMPLATE = ' ReportesController.registrar(ReportesController.<TIPO_KEY>, <VALUE>);';

    walkSync(APP_FOLDER, fileList);
    fileList.forEach(function(filePath) {

        fs.readFile(filePath, 'utf8', function(err, javaFileContent) {
            if (err) throw err;
            var codigoGenerado = generarCodigo(javaFileContent.toString(), activado);
            fs.writeFile(filePath, codigoGenerado, function(err) {
                if (err) throw err;
                console.log('Generado:', filePath);
            });
        });
    });

    function generarCodigo(javaFileContent, activado) {
        var res = javaFileContent.match(/\/\* *@Reportes *\( *{.+} *\) *\*\//gi);
        if (res) {
            res.forEach(function(matchedString) {
                var annotationBodyJSON = matchedString.replace(/\/\* *@Reportes *\( */, '').replace(/ *\) *\*\//, '');
                var annotationBody = JSON.parse(annotationBodyJSON);
                var generatedCode = matchedString + CODE_TEMPLATE.replace("<TIPO_KEY>", annotationBody.key).replace("<VALUE>", annotationBody.value);
                var wasGeneratedBefore = javaFileContent.includes(generatedCode);

                if (activado && !wasGeneratedBefore) {
                    javaFileContent = javaFileContent.replace(matchedString, generatedCode);
                } else if (!activado && wasGeneratedBefore) {
                    javaFileContent = javaFileContent.replace(generatedCode, matchedString);
                }

            });
            console.log("REGULAR EXP: javaFileContent\n", javaFileContent);
        }
        return javaFileContent;
    }
}




var walkSync = function(dir, filelist) {
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};
