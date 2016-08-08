/**
 * Created by Jordan on 8/8/2016.
 */
'use strict';

angular.module('searchFilter', [])
    .filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                //console.log(input.slice(start), "  ", start);

                    return input.slice(start);

            }
            return [];
        };
    });