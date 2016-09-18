/**
 * Created by Jordan on 8/9/2016.
 */
'use strict';

angular.module('itemService', [])
    .factory('GetItems', function ($http, $window) {
        var getItems = {
            async: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get("api/item/getItems.php").then(function (response) {

                    if (response.data != '0 results') {
                        var items = response.data;
                        var totalItems = items.length;
                        var data = [items, totalItems];
                    } else {
                        items = [];
                        totalItems = 0;
                        data = [items, totalItems];
                    }
                    // The then function here is an opportunity to modify the response

                    // The return value gets picked up by the then in the controller.
                    return data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return getItems;
    })

    .factory('PlaceBid', function ($http) {
        var placeBid = {
            async: function (bid) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http({
                    url: "api/bid/insertBid.php",
                    data: bid,
                    method: 'POST',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'}
                }).success(function () {

                    //Show message
                    $('#createSuccess').fadeIn('slow');
                    setTimeout(function () {
                        $('#createSuccess').fadeOut('slow');
                    }, 3000);


                });
                // Return the promise to the controller
                return promise;
            }
        };
        return placeBid;

    });