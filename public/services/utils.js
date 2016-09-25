var utils = {};

utils.getterFromPost = function(req) {
	function get(atributos, mensajeDeFallo){
		var arregloAtributos = atributos.split(".");
		var valor = req.body;
		for (var i = 0; i < arregloAtributos.length; i++) {
			valor = valor[arregloAtributos[i]];
		}

		if (mensajeDeFallo) {
			if (valor === null || valor === "" || typeof valor === "undefined") {
				var err = new Error(mensajeDeFallo);
				err.status = 400;
				throw err;
			}
		}
		return valor;
	}
	return {get:get};

};

utils.getter = function(data) {
	function get(attribute, messageIfNull) {
		var resp = data[attribute];
		if ((!resp || resp === "" || typeof resp === "undefined") && messageIfNull) {
			throw new Error(messageIfNull);
		}
		return resp;
	}
	return get;
};

utils.getterFromLine = function(line) {
	var i = 0;
	function next(messageIfNull) {
		while (i < line.length && line[i] ===' ') {
			i++;
		}
		var begin = i;
		while (i < line.length && line[i] !==' ') {
			i++;
		}
		var resp = line.substring(begin, i);
		if ((!resp || resp === "") && messageIfNull) {
			throw new Error(messageIfNull);
		}
		return resp;
	}
	return {next:next};
};

utils.error = function(message, status) {
	var error = new Error(message);
	error.status = status;
	return error;
};


module.exports = utils;
