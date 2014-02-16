'use strict';

angular.module('mean.librarys').controller('LibrarysController', ['$scope', '$routeParams', '$location', 'Global', 'Librarys', function ($scope, $routeParams, $location, Global, Librarys) {
    $scope.global = Global;

    $scope.create = function() {
        var library = new Librarys({
            title: this.title,
            content: this.content,
            thumb : this.thumb,
            rating : this.rating,
            tags : this.tags
        });
        console.log(library);
        library.$save(function(response) {
            $location.path('librarys/' + response._id);
        });

       
    };

    $scope.remove = function(library) {
        if (library) {
            library.$remove();

            for (var i in $scope.librarys) {
                if ($scope.librarys[i] === library) {
                    $scope.librarys.splice(i, 1);
                }
            }
        }
        else {
            $scope.library.$remove();
            $location.path('librarys');
        }
    };

    $scope.update = function() {
        var library = $scope.library;
        if (!library.updated) {
            library.updated = [];
        }
        library.updated.push(new Date().getTime());

        library.$update(function() {
            $location.path('librarys/' + library._id);
        });
    };

    $scope.find = function() {
        Librarys.query(function(librarys) {
            $scope.librarys = librarys;
        });
    };

    $scope.findOne = function() {
        Librarys.get({
            libraryId: $routeParams.libraryId
        }, function(library) {
            $scope.library = library;
        });
    };
}]);