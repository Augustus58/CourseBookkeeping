CbkApp.controller('CoursesController', function ($scope, Api) {
    Api.getCourses().success(function (response) {
        $scope.courses = response;
    });
    $scope.add = function () {
        Api.addCourse($scope.newCourse).success(function (response) {
            $scope.courses.push(response);
            $scope.newCourse = {};
            $scope.errorMessage = null;
        }).error(function (response) {
            $scope.errorMessage = response.error;
        });
    };
});
