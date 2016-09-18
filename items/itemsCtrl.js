/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('ItemsCtrl', ['GetItems', 'PlaceBid', '$scope', '$http', '$timeout', function (GetItems, PlaceBid, $scope, $http, $timeout) {
    $('#createSuccess').hide();

    $scope.setModal = function (item) {

        $scope.modalItem = item;


    };
    $scope.setModal2 = function (item) {
        $scope.modalItem2 = item;

    };

    $scope.getItems = function () {
        $scope.loadingItems = true;

        GetItems.async().then(function (data) {
            $scope.items = data[0];
            $scope.totalItems = data[1];

            $scope.loadingItems = false;
        });
    };

    $scope.closeAlert = function () {
        $scope.showAlert = false;
    };

    $scope.getItemIndex = function (itemId) {
        var $index = null;
        var $found = false;
        var $count = 0;
        while (!$found) {
            if (itemId == $scope.items[$count].item_id) {
                $index = $count;
                $count = 0;
                $found = true;
                return $index;
            } else {
                $count++;
            }
        }

    };
    
    $scope.makeBid = function (itemId) {
        $scope.loading = true;
        var $index = $scope.getItemIndex(itemId);

        $scope.bid = {
            name: $scope.name,
            email: $scope.email,
            phone: $scope.phone,
            bid: $scope.bid,
            itemId: itemId
        };

        PlaceBid.async($scope.bid).success(function () {


            $scope.loading = false;


            $scope.items[$index].item_price = $scope.bid.bid + ".00";
            $scope.items[$index].item_high_bidder = $scope.bid.name;


            $scope.clearBid();
        });
    };

    $scope.clearBid = function () {

        $scope.userForm.$setPristine();
        $scope.name = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.bid = '';
    };


    $scope.getItems();

    $scope.currentPage = 1;
    $scope.numPerPage = 8;
    $scope.maxSize = 5;


    $scope.filter = function () {
        $timeout(function () {
            $scope.totalItems = $scope.filteredItems.length;
        }, 10);
    };


}]);


