'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/librarys', {
            templateUrl: 'views/librarys/list.html'
        }).
        when('/librarys/create', {
            templateUrl: 'views/librarys/create.html'
        }).
        when('/librarys/:libraryId/edit', {
            templateUrl: 'views/librarys/edit.html'
        }).
        when('/librarys/:libraryId', {
            templateUrl: 'views/librarys/view.html'
        }).
        when('/', {
            templateUrl: 'views/librarys/list.html'
        }).
        otherwise({
            templateUrl: 'views/librarys/list.html'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);