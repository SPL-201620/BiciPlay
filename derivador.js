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
var filename = fs.readFile('/home/andres/Instalaciones/BiciPlay7/configuracion.txt', 'utf8', function(err,data2) {

        data2 = data2.toString();
        console.log("File: " + data2);
var position = data2.toString().indexOf('\n'); // find position of new line element

if (position != -1) {
        dataArr = data2.split('\n');
        console.log("dataArr: " + dataArr);

        var obj = {};

        for (i=0;i<dataArr.length;i++) {
                      obj[dataArr[i]] = true;
        }

        if(obj.IngresoApp){
              console.log("objeto", obj)
        }
         data2 = JSON.stringify(obj, null, 4);

                fs.writeFile('/home/andres/Instalaciones/BiciPlay7/configuracionJSon.txt', data2, function(err) {
                        if (err) { // if error, report
                        console.log (err);
                }
                        console.log("Finished");
        })
};
});
