'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404-page');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html?v=' + window.app_version,
                controller: 'HomeCtrl'
            })

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'admin/admin.html?v=' + window.app_version,
                controller: 'AdminCtrl'
            })


        
    });
 
