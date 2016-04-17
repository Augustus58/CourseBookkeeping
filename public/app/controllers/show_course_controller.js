CbkApp.controller('ShowCourseController', function ($scope, $routeParams, $location, Api) {
    Api.getCourse($routeParams.id).success(function (response) {
        $scope.course = response;
    });
    $scope.addTask = function () {
        Api.addTask($scope.course.id, $scope.newTask).success(function (response) {
            $scope.course.Tasks.push(response);
            $scope.newTask = {};
            $scope.errorMessage = null;
        }).error(function (response) {
            $scope.errorMessage = response.error;
        });
    };
    $scope.fulfilments = function () {
        $location.path('courses/' + $scope.course.id + '/fulfilments');
    };
});
