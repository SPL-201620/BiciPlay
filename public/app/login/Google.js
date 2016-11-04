/*jslint node: true */
angular.module('app').service('Google', function($rootScope, $route, $window, $location, $q, Http) {
    var self = this;

    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: '531662169734-31va4qq4thof6iduvm05asihmobq4g0f.apps.googleusercontent.com',
            scope: 'profile'
        });


    });


    self.login = function(userLogin) {
        return $q(function(resolve, reject) {
            // Sign the user in, and then retrieve their ID.
            auth2.signIn().then(function() {
                var profile = auth2.currentUser.get().getBasicProfile();
                resolve({
                    id: profile.getId(),
                    name: profile.getGivenName(),
                    email: profile.getEmail(),
                    foto: profile.getImageUrl()
                });
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
});
