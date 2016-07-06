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

        //todo get items from db
        $scope.items = [{title: "Title 1"}, {title: "Title 2"}];
    };

    $scope.makeBid = function () {

        if (/*$scope.name == undefined || $scope.name == ''*/false) {
            alert("No Name");
        } else {
            //$scope.bid = {name: $scope.name, email: $scope.email, phone: $scope.phone, bid: $scope.bid, itemId: $scope.itemId};

            $scope.bid = {name: "Corey Weber", email: "Test@Test.com", phone: "90299999999", bid: 1000000, itemId: 1};

            /*$http.post('index.php/postBid', $scope.bid).success(function(response){
             console.log("not fed up!", response);
             }).error(function(response){
             console.log("fed up!");
             });*/

            console.log("Testing");

            $http.get("index.php")
                .then(function (response) {
                    console.log(response);
                });

            /*$http.get('index.php').success(function (data) {
                console.log(data);
            });*/
            
            /*$http({$app->run();//run
             method: 'POST',
             url: '../index.php/postBid',
             data: $scope.bid,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).
             success(function(response) {
             $scope.codeStatus = response.data;
             }).
             error(function(response) {
             $scope.codeStatus = response || "Request failed";
             });*/
            //todo add to db
            //http.post('/database.php', $scope.bid).then(successCallback, errorCallback);
        }

    };

    //todo
    //getHighestBid
    //getAllBids

    //initialize
    $scope.getItems();
    $scope.makeBid();

}]);