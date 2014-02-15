'use strict';

//Librarys service used for librarys REST endpoint
angular.module('mean.librarys').factory('Librarys', ['$resource', function($resource) {
    return $resource('librarys/:libraryId', {
        libraryId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);