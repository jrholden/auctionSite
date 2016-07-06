/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('ItemsCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    console.log("We Are ITEMS");

    $scope.setModal = function (item) {
        $scope.modalItem = item;
        console.log($scope.modalItem);
    };

    $scope.getItems = function () {

        console.log("Testing");

        $http.get("getItems.php")
            .then(function (response) {
                $scope.items = response.data;
            });
    };

    $scope.makeBid = function () {

        if (/*$scope.name == undefined || $scope.name == ''*/false) {
            alert("No Name");
        } else {
            //$scope.bid = {name: $scope.name, email: $scope.email, phone: $scope.phone, bid: $scope.bid, itemId: $scope.itemId};

            $scope.bid = {name: "Corey Weber", email: "Test@Test.com", phone: "90299999999", bid: 1000000, itemId: 1};

            $http({

                url: "index.php",
                data: $scope.bid,
                method: 'POST',
                headers : {'Content-Type':'application/json; charset=UTF-8'}

            }).success(function(data){

                console.log("OK", data)

            }).error(function(err){"ERR", console.log(err)});

        }

    };

    //todo
    //getHighestBid
    //getAllBids

    //initialize
    $scope.getItems();
    $scope.makeBid();

}]);