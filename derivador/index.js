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
    derivarREST(features.Reportes, features.Retos, features.ConfigBicicletas);
    derivarReportes(features.Reportes);
    derivarTipoReportes(features.Semanal);

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

function derivarREST(aReportes, aRetos, aConfigBicicletas) {
    var REST_FILE = path.join('conf', 'routes');

    var REPORTE_ACTIVADO = '# @REPORTES\n';
    var REPORTE_DESACTIVADO = '# @REPORTES DISABLED';

    var RETOS_ACTIVADO = '# @RETOS\n';
    var RETOS_DESACTIVADO = '# @RETOS DISABLED';

    var CONF_ACTIVADO = '# @CONFIGURACION\n';
    var CONF_DESACTIVADO = '# @CONFIGURACION DISABLED';



    fs.readFile(REST_FILE, 'utf8', function(err, restContent) {
        if (err) throw err;
        var restContentGenerado = restContent.toString();
        restContentGenerado = aReportes?restContentGenerado.split(REPORTE_DESACTIVADO).join(REPORTE_ACTIVADO):restContentGenerado.split(REPORTE_ACTIVADO).join(REPORTE_DESACTIVADO);
        restContentGenerado = aRetos?restContentGenerado.split(RETOS_DESACTIVADO).join(RETOS_ACTIVADO):restContentGenerado.split(RETOS_ACTIVADO).join(RETOS_DESACTIVADO);
        restContentGenerado = aConfigBicicletas?restContentGenerado.split(CONF_DESACTIVADO).join(CONF_ACTIVADO):restContentGenerado.split(CONF_ACTIVADO).join(CONF_DESACTIVADO);

        fs.writeFile(REST_FILE, restContentGenerado, function(err) {
            if (err) throw err;
            //console.log('Generado:', filePath);
        });
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
                //console.log('Generado:', filePath);
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
            //console.log("REGULAR EXP: javaFileContent\n", javaFileContent);
        }
        return javaFileContent;
    }
}

function derivarTipoReportes(activadoSemanal) {
    var REPOERTE_FILE = path.join('app', 'controllers', 'reportes', 'ReportesController.java');
    var REPOERTE_SEMANAL_FILE = path.join(__dirname, "ReportesController.semana.java");
    var REPOERTE_MENSUAL_FILE = path.join(__dirname, "ReportesController.mes.java");
    var selectedFile = activadoSemanal ? REPOERTE_SEMANAL_FILE : REPOERTE_MENSUAL_FILE;
    fs.readFile(selectedFile, 'utf8', function(err, javaFileContent) {
        if (err) throw err;
        fs.writeFile(REPOERTE_FILE, "", function(err) {
            if (err) throw err;
            fs.writeFile(REPOERTE_FILE, javaFileContent, function(err) {
                if (err) throw err;
                //console.log('Generado:', filePath);
            });
        });
    });
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
