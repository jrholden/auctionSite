angular.module('myApp')
    .directive('formatPhone', [
        function() {
            console.log("Hey Werer here");
            return {
                require: 'ngModel',
                restrict: 'A'
                
            };
        }
    ]);