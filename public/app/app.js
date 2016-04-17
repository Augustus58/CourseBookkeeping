var CbkApp = angular.module('CbkApp', ['ngRoute']);

CbkApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'CoursesController',
                templateUrl: 'app/views/courses/index.html',
                resolve: {
                    userLoggedIn: function ($rootScope, Api) {
                        return Api.getUserLoggedIn().success(function (user) {
                            $rootScope.userLoggedIn = user.username ? user : null;
                        });
                    }
                }
            }).when('/courses/:id', {
        controller: 'ShowCourseController',
        templateUrl: 'app/views/courses/show.html',
        resolve: {
            userLoggedIn: function ($rootScope, Api) {
                return Api.getUserLoggedIn().success(function (user) {
                    $rootScope.userLoggedIn = user.username ? user : null;
                });
            }
        }
    }).when('/courses/:id/fulfilments', {
        controller: 'FulfilmentsController',
        templateUrl: 'app/views/fulfilments/index.html',
        resolve: {
            userLoggedIn: function ($rootScope, Api) {
                return Api.getUserLoggedIn().success(function (user) {
                    $rootScope.userLoggedIn = user.username ? user : null;
                });
            }
        }
    }).when('/courses/:id/fulfilments/print', {
        controller: 'FulfilmentsController',
        templateUrl: 'app/views/fulfilments/print.html',
        resolve: {
            userLoggedIn: function ($rootScope, Api) {
                return Api.getUserLoggedIn().success(function (user) {
                    $rootScope.userLoggedIn = user.username ? user : null;
                });
            }
        }
    }).when('/login', {
        controller: 'UsersController',
        templateUrl: 'app/views/users/login.html',
        resolve: {
            userLoggedIn: function ($rootScope, Api) {
                return Api.getUserLoggedIn().success(function (user) {
                    $rootScope.userLoggedIn = user.username ? user : null;
                });
            }
        }
    })
            .when('/register', {
                controller: 'UsersController',
                templateUrl: 'app/views/users/register.html',
                resolve: {
                    userLoggedIn: function ($rootScope, Api) {
                        return Api.getUserLoggedIn().success(function (user) {
                            $rootScope.userLoggedIn = user.username ? user : null;
                        });
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
});

CbkApp.run(function ($rootScope, $location, Api) {
    $rootScope.logOut = function () {
        Api.logout().success(function () {
            $location.path('/login');
            $rootScope.userLoggedIn = null;
        });
    }
});
