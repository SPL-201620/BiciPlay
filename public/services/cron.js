var CronJob = require('cron').CronJob;
var moment = require('moment');
var models = require('../models');

var nombreCron = new CronJob('00 */6 * * * *', function() {
		//Verificar las citas que se quedaron en reserva
		console.log("Cron sin implementación");
	}, function() {

	},
	true,
	'America/Bogota'
);
