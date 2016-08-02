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




    /*$scope.setModal = function (item) {
        $scope.modalItem = item;
        console.log($scope.modalItem);

    };

    
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