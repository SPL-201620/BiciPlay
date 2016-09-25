var env = process.env.NODE_ENV || "development";
var config = require('./config/config.json')[env];

var express = require('express');
var path = require('path');
var fs = require('fs')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Used for passport
var session = require('express-session');
var passport = require('passport');
var moment = require('moment');
moment.locale('es');

var app = express();

var jobs = require('./services/cron');

var DEFAULT_MAX_AGE = 60 * 60 * 1000;


//jobs.iniciarTrabajos();
/*app.use(function(req, res, next) {
	if (req.originalUrl.indexOf("index") > -1)
		console.log("X-Frame-Options REQUEST URL:", req.originalUrl);
	res.setHeader('X-Frame-Options', "Deny");
	next();
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/views')));


//used for passport
app.use(session({
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: app.get('env') !== 'development',
		httpOnly: true,
		maxAge: DEFAULT_MAX_AGE
	},
	rolling: true
}));

// Put it before use static routes to visualize GETs of resources
app.use(logger('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	//console.log("Tiempo de sesión I", req.session.cookie);
	/*req.session.cookie.expires = new Date(Date.now() + DEFAULT_MAX_AGE);
	req.session.save(function(err) {
		// session saved
	});*/
	req.session.touch();
	//console.log("Tiempo de sesión F", req.session.cookie);
	next();
});

app.use('/', require('./routes/index'));
fs
    .readdirSync("./routes")
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
			var name = file.replace('.js','')
      app.use('/'+name, require('./routes/'+file));
    });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
	console.error("ERROR APP: ", err.stack);
	res.status(err.status || 520);
	res.send({
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	});
});


module.exports = app;
