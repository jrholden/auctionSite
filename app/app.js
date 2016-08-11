/*
var console = {};
 console.log = function(){};
*/

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'searchFilter',
    'ui.mask',
    'itemService',
    'loginService'
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

            .state('items', {
                url: '/items',
                templateUrl: 'items/items.html?v=' + window.app_version,
                controller: 'ItemsCtrl'
            })
            
            
            .state('admin', {
                    url: '/admin',
                    templateUrl: 'admin/admin.html?v=' + window.app_version,
                    controller: 'AdminCtrl',
                    resolve: {
                        auth: function(JWT){
                            return JWT.async();
                        }
                    }
                })
            

            .state('contact', {
                url: '/contact',
                templateUrl: 'contact/contact.html?v=' + window.app_version,
                controller: 'ContactCtrl'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html?v=' + window.app_version,
                controller: 'LoginCtrl'
            })



    });
 
