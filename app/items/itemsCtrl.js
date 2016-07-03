/**
 * Created by Corey Weber on 2016-07-03.
 */
'use strict';

angular.module('myApp').controller('ItemsCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

    console.log("We Are ITEMS");

    $scope.items = [{title: "Title 1" }, {title: "Title 2"}];

}]);