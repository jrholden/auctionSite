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

        // Error Checking ==> NEEDS WORK ==> Im thinking switch?
       console.log($scope.name);
        if ($scope.name == undefined || $scope.name == " ") {
            alert("Please enter your name");
        } else if ($scope.price == undefined || $scope.price == " ") {
            alert("Please enter your email");
        }
        else if ($scope.picture == undefined || $scope.picture == " ") {
            alert("Please Enter your phone");
        }
        else if ($scope.description == undefined || $scope.description == " ") {
            alert("Please Enter a bid that is Greater than the Previous");
        } else {
            
            $scope.item = {
                name: $scope.name,
                price: $scope.price,
                image: $scope.picture,
                description: $scope.description
            };

            $http({
                url: "api/item/insertItem.php",
                data: $scope.item,
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function (data) {
                console.log("OK", data[0]);

                $scope.items.push(data[0]);

                $scope.itemCreate = true;
            }).error(function (err) {
                console.log(err);
            });
        }
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
            $scope.itemEdit = true;
        }).error(function(err) {
            console.log(err);
        });
        $scope.itemEdit = false;
        
    };

    $scope.setModal = function (item) {
        $scope.modalItem = item;
        console.log($scope.modalItem);
       
    };



    $scope.deleteItem = function(item) {

        console.log(item);
        $http({
            url: "api/item/deleteItem.php",
            data: item.item_id,
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).success(function(data) {
            console.log("OK", data);
            
            $scope.items.splice($scope.items.indexOf(item),1);
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
            $scope.items.splice($scope.items);
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
    };
    
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
    $scope.getItems();

}]);
