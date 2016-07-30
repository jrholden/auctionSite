/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('AdminCtrl', ['$scope', '$http','$sce', function($scope, $http, $sce) {

    console.log("We Are Admin");

    document.getElementById('file').onchange = function() {
        // Sets the scope variable for photo
        var picture = document.querySelector('input[type=file]').files[0];

        var reader = new FileReader();

        reader.addEventListener("load", function() {
            $scope.picture = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(picture);
        }
    };

    $scope.makeItem = function() {

        //todo error handling check if variables are empty before creating  (alerts if empty)
        $scope.item = { name: $scope.name, price: $scope.price, image: $scope.picture, description: $scope.description }

        $http({
            url: "api/item/insertItem.php",
            data: $scope.item,
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).success(function(data) {
            console.log("OK", data);
        }).error(function(err) {
            console.log(err);
        });
    };
    
    $scope.editItem = function(item){

        console.log(item);
        
        $http({
            url: "api/item/updateItem.php",
            data: item,
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).success(function(data) {
            console.log("OK", data);
        }).error(function(err) {
            console.log(err);
        });
        
    };

    $scope.setModal = function (item) {
        $scope.modalItem = item;
        console.log($scope.modalItem);
       
    };



    $scope.deleteItem = function(itemNum) {

        console.log(itemNum);
        $http({
            url: "api/item/deleteItem.php",
            data: itemNum,
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).success(function(data) {
            console.log("OK", data);
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.deleteAllItems = function() {

        
        $http({
            url: "api/item/deleteAllItems.php",
            method: 'POST',
        }).success(function(data) {
            console.log("OK", data);
        }).error(function(err) {
            console.log(err);
        });
    };

    $scope.fileChange = function(elm) {
        console.log("hey", elm);
        $scope.picture = elm.files;
        $scope.$apply();
    };

    $scope.setModal2 = function(bidId) {
        
        $http.get("api/bid/getHighestBid.php")
            .then(function(response) {
                $scope.bids = response.data;
                

                var $index = null;
                var $count = 0;
                var $found = false;
                while ($count < $scope.bids.length && !$found){
                    if (bidId == $scope.bids[$count].bids_id){
                        $index = $count;
                        $count = 0;
                        $found = true;
                    }else{
                        $count++;
                    }
                }
                    $scope.modalItem2 = $scope.bids[$index];
                    console.log($scope.modalItem2);
                if ($index == null){
                    alert("No Bidders Interested");
                }
            });
        
        
    };
    
    /*$scope.setModal2 = function(bidId){
        
        $scope.getBids();
        
        var $index = null;
        var $found = false;
        var $count = 0;
        
        
        /!*while (!$found){
            if (bidId == $scope.bids[$count].bids_id){
                $index = $count;
                $count = 0;
                $found = true;
            }else{
                $count++;
            }
        }
        $scope.modalItem2 = $scope.bids[$index];*!/



    };*/
    
    
    $scope.getItems = function() {

        console.log("Testing");

        $http.get("api/item/getItems.php")
            .then(function(response) {
                $scope.items = response.data;
                /*console.log($scope.items);*/
            });
    };
    $scope.getItems();

}]);
