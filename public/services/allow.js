/*jslint node: true */
var ROL_ADMIN = 'Administrador';
var ROL_TUTOR = 'Tutor';
var ROL_ESTUDIANTE = 'Estudiante';
var MSG_NO_AUTENTICADO = "Se requiere de autenticación para utilizar los servicios del Cupitaller";
var allow = {
	ALL: function(req, res, next) {
		if (!req.isAuthenticated())
			return authFail(next, MSG_NO_AUTENTICADO);
		else
			return next();
	},
	EST: function(req, res, next) {
		if (!req.isAuthenticated())
			return authFail(next, MSG_NO_AUTENTICADO);
		if(hasRol(req.user, ROL_ESTUDIANTE))
			return next();
		else
			return authFail(next,"Se requiere ser estudiante para realizar la acción que ha solicitado.");
	},
	TUT: function(req, res, next) {
		if (!req.isAuthenticated())
			return authFail(next, MSG_NO_AUTENTICADO);
		if(hasRol(req.user, ROL_TUTOR))
			return next();
		else
			return authFail(next,"Se requiere ser tutor para realizar la acción que ha solicitado.");
	},
	ADM: function(req, res, next) {
		if (!req.isAuthenticated())
			return authFail(next, MSG_NO_AUTENTICADO);
		if(hasRol(req.user, ROL_ADMIN))
			return next();
		else
			return authFail(next,"Se requiere ser administrador para realizar la acción que ha solicitado.");
	}
};

function authFail (next, message){
	var err = new Error(message);
	err.status = 401;
	return next(err);
}

function hasRol(user, rol) {
	if (!user)
		return false;

	var roles = user.roles;
	console.log("ROLES: ", roles.length);
	for (var i = 0; i < roles.length; i++) {
		if (roles[i].Nombre === rol) {
			return true;
		}
	}
	return false;
}


module.exports = allow;