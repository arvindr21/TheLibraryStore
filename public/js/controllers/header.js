'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Add New Library',
        'link': 'librarys/create'
    }];
    
    $scope.isCollapsed = true;
}]);