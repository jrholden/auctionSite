/**
 * Created by Jordan on 8/10/2016.
 */
'use strict';

angular.module('loginService', [])
    .factory('JWT', function ($http, $window) {
        var getJWT = {
            test: function () {
                return $window.localStorage.token;
            },
            async: function () {
                var creds = {
                    toke: this.test(),
                    from: "admin"
                };
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http({
                    url: "api/login/login.php",
                    data: creds,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'}
                }).success(function () {

                }).error(function () {

                    $window.location.href = '#/login';
                });
                // Return the promise to the controller
                return promise;
            }

        };
        return getJWT;
    });
