'use strict';

angular.module('myApp').controller('ContactCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $('#createSuccess').hide();

    $scope.sendMail = function () {

        $scope.loading = true;

        //todo error handling check if variables are empty before creating  (alerts if empty)
        $scope.mail = {name: $scope.name, email: $scope.email, message: $scope.message};

        $http({
            url: "api/contact/contact.php",
            data: $scope.mail,
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).success(function (data) {
            $scope.loading = false;

            //Show message
            $('#createSuccess').fadeIn('slow');
            setTimeout(function () {
                $('#createSuccess').fadeOut('slow');
            }, 3000);
            $scope.clearBid();
        }).error(function (err) {
            $scope.loading = false;

        });
    };
    $scope.clearBid = function () {
        $scope.userForm.$setPristine();
        $scope.name = '';
        $scope.email = '';
        $scope.message = '';
    };

}]);