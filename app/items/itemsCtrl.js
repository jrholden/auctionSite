/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('ItemsCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    console.log("We Are ITEMS");

    $scope.setModal = function(item){
        $scope.modalItem = item;
        console.log($scope.modalItem);
    };

    $scope.getItems = function(){

        //todo get items from db
        $scope.items = [{title: "Title 1"}, {title: "Title 2"}];
    };

    $scope.makeBid = function(){

        if($scope.name == undefined || $scope.name == ''){
            alert("No Name");
        }else{
            $scope.bid = {name: $scope.name, email: $scope.email, phone: $scope.phone, bid: $scope.bid, itemId: $scope.itemId}

            //todo add to db
        }

    };

    //todo
    //getHighestBid
    //getAllBids

    //initialize
    $scope.getItems();

}]);