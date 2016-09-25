var ursa = require("ursa");
var request = require('request');
var fs = require('fs');
var path = require('path');
var Promise = require("bluebird");

var privateKeyForCredentials = ursa.createPrivateKey(fs.readFileSync(path.join("config", "password", "serverPrivate.key")));
var publicKeyForCredentials = fs.readFileSync(path.join("config", "password", "serverPublic.key"));

this.publicKeyForCredentials = publicKeyForCredentials;
this.descifrarCredenciales = function(credenciales) {
	return JSON.parse(privateKeyForCredentials.decrypt(credenciales, 'base64', 'utf8', ursa.RSA_PKCS1_PADDING));
};

this.verificarCaptcha = function(recaptchaResponse) {
	return new Promise(function(resolve, reject) {
		if (!recaptchaResponse || recaptchaResponse === '')
			return resolve(new Error("Se debe especificar una resupuesta de captcha"));

		request.post({
			url: 'https://www.google.com/recaptcha/api/siteverify',
			form: {
				secret: "6LdSviITAAAAAEZJUjvg-Qz483JVHw75R4HVkb8W",
				response: recaptchaResponse
			}
		}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var parsedBody = JSON.parse(body);
				if (parsedBody.success) {
					resolve();
				} else {
					reject(new Error("Falló la verificación del captcha."));
				}
			} else {
				reject(new Error("Falló la comunicación con el servidor de captcha."));
			}
		});
	});
};

module.exports = this;