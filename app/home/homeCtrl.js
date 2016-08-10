/**
 * Created by Corey Weber on 2016-07-03.
 */
/*var console = {};
console.log = function(){};*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['GetItems', 'PlaceBid', '$scope', '$http', function(GetItems, PlaceBid, $scope, $http) {

    console.log("We Are Home");
    
    $('#createSuccess').hide();

    $scope.getItems = function () {
        $scope.loadingItems = true;

        GetItems.async().then(function(data){
            $scope.items = data[0];
            $scope.totalItems = data[1];
            $scope.loadingItems = false;
        });
    };
    
    $scope.getSecondIndex = function(index) {
        
        if( index-$scope.items.length>=0 )
            return index-$scope.items.length;
        else
            return index;
    };

    
    $scope.setModal2 = function (item) {
        $scope.modalItem2 = item;
        $("#myCarousel").carousel('pause');
    };
    
    $scope.setModal = function (item) {
        $scope.modalItem = item;
        $("#myCarousel").carousel('pause');
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

        PlaceBid.async($scope.bid).success(function() {

            $scope.loading = false;
            
            
            
            $scope.items[$index].item_price = $scope.bid.bid+".00";
            $scope.items[$index].item_high_bidder = $scope.bid.name;

            $scope.clearBid();
        });
    };

    $scope.clearBid = function () {
        $("#myCarousel").carousel('cycle');
        $scope.userForm.$setPristine();
        $scope.name = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.bid = '';
    };
    
    $scope.getItems();

}]);