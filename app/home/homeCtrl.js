/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$http','$sce', function($scope, $http, $sce) {

    console.log("We Are Home");
    $scope.getItems = function() {

        $http.get("api/item/getItems.php")
            .then(function(response) {

                if(response.data != '0 results'){
                    $scope.items = response.data;
                    console.log("Response", response.data);
                }else{
                    $scope.items = [];
                    console.log("Length", $scope.items.length);
                }

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
        $scope.inUse = false;
        console.log($scope.modalItem2);

    };
    $scope.setModal = function (item) {
        $scope.modalItem = item;
        $scope.inUse=false;
        console.log($scope.modalItem);

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
        //Needed to find index of items array
        var $index = $scope.getItemIndex(itemId);
        $scope.higherBid = false;
        // Error Checking ==> NEEDS WORK ==> Im thinking switch?

        if ($scope.bid - $scope.items[$index].item_price <= 0) {
            $scope.higherBid = true;
            alert("Please Enter a bid that is greater than: " + $scope.items[$index].item_price);

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
                $scope.items[$index].item_price = $scope.bid.bid+".00";
                $scope.bidMade = true;
                $scope.higherBid = true;

                $scope.clearBid();

            }).error(function (err) {
                console.log(err);
            });
        }
    };

    $scope.clearBid = function () {
        $scope.userForm.$setPristine();
        $scope.name = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.bid = '';
    };

    /*
    $scope.fileChange = function(elm) {
        console.log("hey", elm);
        $scope.picture = elm.files;
        $scope.$apply();
    };

    $scope.setModal2 = function(bidId) {

        console.log("bidId:", bidId);

        if(bidId != '0' && bidId != 0 && bidId != null){

            $http({
                url: "api/bid/getHighestBid.php",
                data: bidId,
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            }).success(function(data) {
                $scope.isBid = true;
                console.log("OK", data);

                $scope.modalItem2 = data[0];

                console.log($scope.modalItem2);
                //open modal with data

            }).error(function(err) {
                console.log(err);

                //error
            });

        }else{
            //no bid error
            $scope.isBid = false;
        }
    };*/

  
    $scope.getItems();

}]);