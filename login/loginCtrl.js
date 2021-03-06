'use strict';

angular.module('myApp').controller('LoginCtrl', ['JWT', '$scope', '$http', '$window', function (JWT, $scope, $http, $window) {

   
    if (JWT.test()) {
        $window.location.href = '#/admin';
    }

    $scope.checkLogin = function () {
        $scope.loading = true;

        $scope.creds = {
            user: $scope.username,
            passW: $scope.pass,
            from: "login"
        };
        $http({
            url: "api/login/login.php",
            data: $scope.creds,
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (response) {

            if (response === "Failed") {
                $scope.incorrect = true;
                $scope.loading = false;
            } else {

                $window.localStorage.token = response.jwt;
                $scope.loading = false;
                $window.location.href = '#/admin';
            }
        }).error(function (err) {
        });

    };


}]);