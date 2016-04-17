CbkApp.controller('FulfilmentsController', function ($scope, $routeParams, $location, Api) {
    Api.getCourse($routeParams.id).success(function (response) {
        $scope.course = response;
    });
    Api.getFulfilments($routeParams.id).success(function (response) {
        $scope.fulfilments = response;
    });
    $scope.searchFulfilment = function (fulfilment, task) {
        var points;
        angular.forEach(fulfilment.TaskFulfilments, function (value, key) {
            if (value.TaskId == task.id) {
                points = value.points;
            }
        });
        return points;
    };
    $scope.add = function () {
        Api.addFulfilment($scope.course.id, $scope.newFulfilment).success(function (response) {
            $scope.fulfilments.push(response);
            $scope.newFulfilment = {};
            $scope.errorMessage = null;
        }).error(function (response) {
            $scope.errorMessage = response.error;
        });
    };
    $scope.printAll = function () {
        $location.path('/courses/' + $routeParams.id + '/fulfilments/print');
    };
    $scope.print = function () {
        var printContents = document.getElementById('print').innerHTML;
        var popupWin = window.open('', '_blank', 'width=800,height=600');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
        popupWin.document.close();
    };
});
