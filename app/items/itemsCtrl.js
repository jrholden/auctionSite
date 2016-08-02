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
        
        $http.get("api/item/getItems.php")
            .then(function (response) {
                    $scope.items = response.data;
                    console.log($scope.items);
            });
    };

    $scope.makeBid = function (itemId) {
        //Needed to find index of items array
        var $index = null;
        var $found = false;
        var $count = 0;
        while (!$found){
            if (itemId == $scope.items[$count].item_id){
                $index = $count;
                $count = 0;
                $found = true;
            }else{
                $count++;
            }
        }
           // Error Checking ==> NEEDS WORK ==> Im thinking switch?
            if ($scope.name == undefined || $scope.name == ' ') {
                alert("Please enter your name");
            } else if ($scope.email == undefined || $scope.email == ' ') {
                alert("Please enter your email");
            }
            else if ($scope.phone == undefined || $scope.phone == ' ') {
                alert("Please Enter your phone");
            }
            else if ($scope.bid == undefined || $scope.bid == ' ' || $scope.bid - $scope.items[$index].item_price <= 0) {
                console.log($scope.items[$index].item_price);
                console.log($scope.bid);
                alert("Please Enter a bid that is Greater than the Previous");
            } else {
                console.log($scope.name);
                 
                $scope.bid = {
                    name: $scope.name,
                    email: $scope.email,
                    phone: $scope.phone,
                    bid: $scope.bid,
                    itemId: itemId

                };

                //$scope.bid = {name: "Corey Weber", email: "Test@Test.com", phone: "90299999999", bid: 1000000, itemId: 1};

                $http({
                    url: "api/bid/insertBid.php",
                    data: $scope.bid,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'}
                }).success(function (data) {
                    console.log("OK", data);
                    $scope.bidMade = true;
                }).error(function (err) {
                    console.log(err);
                });
            };
     


        };

    //todo
    //getHighestBid
    //getAllBids

    //initialize
    $scope.getItems();
    

}]);