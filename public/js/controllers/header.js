'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Create New Library',
        'link': 'librarys/create'
    }];
    
    $scope.isCollapsed = true;
}]);