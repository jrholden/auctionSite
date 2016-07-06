/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('AdminCtrl', ['$scope', '$http', function ($scope, $http) {

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

    $scope.fileChange = function(elm){
        console.log("hey", elm);
        $scope.picture = elm.files;
        $scope.$apply();
    }


}]);