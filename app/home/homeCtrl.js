/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

    console.log("We Are Home");
    
    $('#createSuccess').hide();
    
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

        $scope.loading = true;
        //Needed to find index of items array
        var $index = $scope.getItemIndex(itemId);
        $scope.higherBid = false;

            $scope.bid = {
                name: $scope.name,
                email: $scope.email,
                phone: $scope.phone,
                bid: $scope.bid,
                itemId: itemId

            };

            $http({
                url: "api/bid/insertBid.php",
                data: $scope.bid,
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function (data) {
                $scope.loading = false;
                //Show message
                $('#createSuccess').fadeIn('slow');
                setTimeout(function(){
                    $('#createSuccess').fadeOut('slow');
                }, 3000);
                
                $scope.items[$index].item_price = $scope.bid.bid+".00";
                $scope.bidMade = true;
                $scope.higherBid = true;

                $scope.clearBid();

            }).error(function (err) {
                $scope.loading = false;
            });
        
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