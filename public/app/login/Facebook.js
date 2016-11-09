/*jslint node: true */
angular.module('app').service('Facebook', function($rootScope, $route, $window, $location, $q, Http) {
    var self = this;
    FB.init({
        appId: '646051245577345',
        cookie: true,
        xfbml: true,
        version: 'v2.5'
    });

    function statusChangeCallback(response) {
        return $q(function(resolve, reject) {
            if (response.status === 'connected') {
                FB.api('/me', {
                    fields: 'name, email, picture'
                }, function(facebookUser) {
                    facebookUser.foto = facebookUser.picture.data.url;
                    resolve(facebookUser);
                });
            } else {
                resolve(null);
            }
        });
    }

    checkLoginState();

    function checkLoginState() {
        FB.getLoginStatus(function(res) {
            statusChangeCallback(res);
        });
    }

    self.login = function(userLogin) {
        return $q(function(resolve, reject) {
            FB.login(function(res) {
                resolve(statusChangeCallback(res));
            }, {
                scope: 'public_profile,email,publish_actions'
            });
        });
    };
    self.logout = function() {
        return $q(function(resolve, reject) {
            if (FB.getAccessToken() !== null) {
                FB.logout(resolve);
            } else {
                resolve();
            }
        });
    };

    self.share = function(message, link, title, greeting) {
        return $q(function(resolve, reject) {
            if (FB.getAccessToken() !== null) {
                var params = {
                    message: greeting,
                    name: title,
                    link: link,
                    description: message,
                    picture: 'http://2.gravatar.com/avatar/8a13ef9d2ad87de23c6962b216f8e9f4?s=128&amp;d=mm&amp;r=G'
                };
                console.log("Facebook params: ", params);
                FB.api('/me/feed', 'post', params, function(response) {
                    console.log("Se compartió el mensaje: ", message, response);
                    resolve();
                });
            } else {
                reject();
            }
        });

    };


});
