'use strict';

angular.module('myApp').controller('ContactCtrl', ['$scope', '$http','$sce', function($scope, $http, $sce) {
   
   console.log("We Are Contact");
   
   $scope.sendMail = function() {

      $scope.loading = true;

      //todo error handling check if variables are empty before creating  (alerts if empty)
      $scope.mail = { name: $scope.name, price: $scope.email, message: $scope.message };

      $http({
         url: "api/contact/contact.php",
         data: $scope.mail,
         method: 'POST',
         headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      }).success(function(data) {
         console.log("OK", data);
         $scope.loading = false;
         
      }).error(function(err) {
         console.log(err);
         $scope.loading = false;

      });
   };
   
}]);