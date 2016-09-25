var allow = require('../services/allow');
var utils = require('../services/utils');
var db = require('../models');
var express = require('express');
var router = express.Router();

var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env];

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


var lti = require('ims-lti');

//TODO identify if i should errase this code:

var request = require('request');
var CourseraStrategy = require('passport-coursera-oauth').OAuth2Strategy;
var CLIENT_ID = 'fFH0i9s6B-a27m5_vw48kA';
var CLIENT_SECRET = 'leLRWDakQpZ47Cr8LgVDJQ';

//https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Flocalhost%3A8000%2Flti&scope=view_profile&state=csrf_code1234
//https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Fcupiexamenes.herokuapp.com%2Flti&scope=view_profile&state=csrf_code1234

/*setTimeout(function() {
    request({
        url: 'https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=_ZebnnLCwq5CtJaZUnaFiQ&redirect_uri=https%3A%2F%2Fcupiexamenes.herokuapp.com%2Flti&scope=view_profile&state=csrf_code1234',
        method: 'GET'
    }, function(err, res) {
        console.log("Se hizo ping")
            //console.log("Access Token:", res.body);
    });
}, 8000);*/


//var provider = lti.Provider (consumer_key, consumer_secret)

/*Client ID: _ZebnnLCwq5CtJaZUnaFiQ
Secret Key: TmzslydSk7z5Wl2gOCNDsg
Auth Method: OAuth2
Redirect URIs:
https://cupiexamenes.herokuapp.com*/

var request = require('request');




passport.use(new CourseraStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://www.cupiexamenes.com/lti/callback",
        profileFields: ['timezone', 'locale', 'privacy']
    },
    function(accessToken, profile, done) {
        console.log("Access Token 1:", accessToken);
        console.log("profile profile 1:", profile);
        done(false, {
            hola: "hola"
        });
    }
));

passport.use(new LocalStrategy(function(username, password, done) {
    db.usuario.findById(username)
        .then(function(findedUser) {
            if (findedUser) {
                return done(null, findedUser);
            } else {
                return done(new Error("Credenciales incorrectas"), false);
            }
        }).catch(function(err) {
            return done(err, false);
        });
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    // El id es el login del usuario
    models.Usuario.findById(id)
        .then(function(user) {
            done(null, user);
        });
});

router.get('/lti2',
    passport.authenticate('coursera', {
        scope: ['view_profile']
    }));

router.get('/lti/callback',
    passport.authenticate('coursera', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        console.log("YEIIII");
            // Successful authentication, redirect home.
        res.redirect('/');
    });


router.post('/lti', function(req, res) {
    console.log("Coursera response", req.body);
    res.send("OK");
});
router.get('/lti', function(req, res) {
    var code = req.query.code;

    console.log("CODE coursera", code);
    request({
        url: 'https://accounts.coursera.org/oauth2/v1/token',
        method: "POST",
        'content-type': 'application/x-www-form-urlencoded',
        auth: {
            'user': CLIENT_ID,
            'pass': CLIENT_SECRET
        },
        form: {
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: 'http://www.cupiexamenes.com/lti',
            grant_type: 'authorization_code'
        }
    }, function(err, res) {
        var json = JSON.parse(res.body);
        console.log("Access Token:", json);
    });

    res.send("OK");
});

module.exports = router;
