CbkApp.controller('UsersController', function ($scope, $location, Api) {
    $scope.errorMessage = "";
    $scope.login = function () {
        Api.login($scope.user)
                .success(function () {
                    $location.path('/');
                })
                .error(function () {
                    $scope.errorMessage = 'Wrong username or pass!';
                });
    };

    $scope.register = function () {
        if ($scope.user.password != $scope.user.passVer) {
            $scope.errorMessage = 'Passwords not identical!';
        } else {
            Api.register($scope.user)
                    .success(function () {
                        $scope.login();
                    })
                    .error(function () {
                        $scope.errorMessage = 'Username in use!';
                    });
        }
        ;
    };
});
