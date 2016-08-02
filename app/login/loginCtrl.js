'use strict';

angular.module('myApp').controller('LoginCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

   console.log("We Are LOGIN");

   $scope.checkLogin = function() {

      $http.get("api/login/login.php")
          .then(function(response) {

             if(response.data != '0 results'){
                $scope.creds = response.data;
                //console.log("Response", response.data);
                console.log($scope.username);
                if ($scope.username === $scope.creds[0].login && $scope.pass === $scope.creds[0].password) {
                    console.log("Login Success");
                    $window.location.href = '#/admin';
                }
                 else{
                    console.log("Failed");
                }
             }else{
               console.log("Failed")
             }

          });
   };
   
   
}]);