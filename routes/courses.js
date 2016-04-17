var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

router.get('/', function (req, res, next) {
    Models.Course.findAll().then(function (data) {
        res.status(200).json(data).end();
    });
});

router.get('/:id', function (req, res, next) {
    var courseId = req.params.id;
    Models.Course.findOne({
        where: {id: courseId},
        include: {model: Models.Task}
    }).then(function (data) {
        res.status(200).json(data).end();
    });
});

router.get('/:id/fulfilments', function (req, res, next) {
    var courseId = req.params.id;
    Models.CourseFulfilment.findAll({
        where: {Courseid: courseId},
        include: {model: Models.TaskFulfilment,
            include: {model: Models.Task}}
    }).then(function (data) {
        res.status(200).json(data).end();
    });
});

router.post('/:id/tasks', authentication, function (req, res, next) {
    var courseId = req.params.id;
    var taskToAdd = req.body;

    taskToAdd.CourseId = courseId;

    var patt = /^[1-9]\d*$/g;

    if (taskToAdd.name == null || taskToAdd.name == '' || !patt.test(taskToAdd.maxPoints)) {
        res.status(403).json({error: 'Bad task name or max points!'});
    } else {
        Models.Task.create(taskToAdd).then(function (reply) {
            res.status(200).json(reply).end();
        });
    }
});

router.post('/:id/fulfilments', authentication, function (req, res, next) {
    var courseId = req.params.id;
    var fulfilmentToAdd = {studentNumber: req.body.studentNumber,
        CourseId: courseId};

    var valid = true;
    var patt = /^\d+$/;

    var taskNumber = 0;

    var taskFulfilments = req.body.taskFulfilments;

    for (var propertyName in taskFulfilments) {
        if (taskFulfilments.hasOwnProperty(propertyName)) {
            taskNumber++;
            if (!patt.test(taskFulfilments[propertyName].points)) {
                valid = false;
            }
        }
    }

    var counter = 0;

    if (!patt.test(fulfilmentToAdd.studentNumber) || !valid) {
        res.status(403).json({error: 'Illegal student number or fulfilment point!'});
    } else {
        Models.CourseFulfilment.create(fulfilmentToAdd).then(function (reply) {
            for (var property in req.body.taskFulfilments) {
                Models.TaskFulfilment.create({points: req.body.taskFulfilments[property].points,
                    CourseFulfilmentId: reply.id,
                    TaskId: property}).then(function (reply2) {
                    counter++;
                    if (counter == taskNumber) {
                        sendResponse(reply);
                    }
                });
            }
        });
    }
    var sendResponse = function (reply) {
        Models.CourseFulfilment.findOne({
            where: {id: reply.id},
            include: {model: Models.TaskFulfilment,
                include: {model: Models.Task}}
        }).then(function (data) {
            res.status(200).json(data).end();
        });
    };
});

router.post('/', authentication, function (req, res, next) {
    var courseToAdd = req.body;
    if (courseToAdd.name == null || courseToAdd.name == '') {
        res.status(403).json({error: 'Bad course name!'});
    } else {
        Models.Course.create(courseToAdd).then(function (course) {
            res.status(200).json(course).end();
        });
    }
});

module.exports = router;
