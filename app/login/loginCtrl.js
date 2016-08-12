'use strict';

angular.module('myApp').controller('LoginCtrl', ['JWT', '$scope', '$http', '$window', function (JWT, $scope, $http, $window) {

   console.log("We Are LOGIN");
    if(JWT.test()){
        $window.location.href = '#/admin';
    }

   $scope.checkLogin = function() {
       $scope.loading = true;
       console.log("WERE HERER");
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
           
           if(response === "Failed") {
               console.log("Done Fucked Up");
               $scope.incorrect = true;
               $scope.loading = false;
           }else{

               $window.localStorage.token = response.jwt;
               $scope.loading = false;
               $window.location.href = '#/admin';
           }
       });
   
   };
   
   
}]);