/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('AdminCtrl', ['$scope','$rootScope', '$http', function ($scope, $rootScope, $http) {

    console.log("We Are Admin");
    
    
    $scope.makeItem = function () {

        //todo error handling check if variables are empty before creating  (alerts if empty)
        $scope.item = {name: $scope.name, price: $scope.price, image: $scope.picture, description: $scope.description}
        console.log("picture: ", $scope.picture);

        $http({
            url: "insertItem.php",
            data: $scope.item,
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (data) {
            console.log("OK", data);
        }).error(function (err) {
            console.log(err);
        });
    };

    $scope.updateItem = function () {

        //todo error handling check if variables are empty before creating  (alerts if empty)
        $scope.itemUpdate = {name: $scope.name, price: $scope.price, image: $scope.picture, description: $scope.description}
        console.log("picture: ", $scope.picture);

        $http({
            url: "updateItem.php",
            data: $scope.itemUpdate,
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (data) {
            console.log("OK", data);
        }).error(function (err) {
            console.log(err);
        });
    };

    $scope.getItemId = function () {

        console.log("Testing");

        $http.get("getItemId.php")
            .then(function (response) {
                $scope.itemId = response.data;
                console.log($scope.itemId);
            });
        
    };
    
    $scope.deleteItem = function () {

        //todo error handling check if variables are empty before creating  (alerts if empty)
        $scope.getItemId();
       

        $http({
            url: "deleteItem.php",
            data: $scope.itemId,
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (data) {
            console.log("OK", data);
        }).error(function (err) {
            console.log(err);
        });
    };

    
    

    $scope.fileChange = function(elm){
        console.log("hey", elm);
        $scope.picture = elm.files;
        $scope.$apply();
    }


}]);