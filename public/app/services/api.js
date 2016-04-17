CbkApp.service('Api', function ($http) {

    this.getCourses = function () {
        return $http.get('/courses');
    };
    this.addCourse = function (course) {
        return $http.post('/courses', course);
    };
    this.getCourse = function (id) {
        return $http.get('/courses/' + id);
    };
    this.addTask = function (courseId, task) {
        return $http.post('/courses/' + courseId + '/tasks', task);
    };
    this.getFulfilments = function (courseId) {
        return $http.get('/courses/' + courseId + '/fulfilments');
    };
    this.addFulfilment = function (courseId, fulfilment) {
        return $http.post('/courses/' + courseId + '/fulfilments', fulfilment);
    };

    this.login = function (user) {
        return $http.post('/users/authenticate', user);
    };
    this.register = function (user) {
        return $http.post('/users', user);
    };
    this.getUserLoggedIn = function () {
        return $http.get('/users/logged-in');
    };
    this.logout = function () {
        return $http.get('/users/logout');
    };
});
