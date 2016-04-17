var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function (req, res, next) {
    // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
    var userToAdd = req.body;
    console.log("DEBUG");
    console.log(userToAdd);
    Models.User.findOne({
        where: {username: userToAdd.username}
    }).then(function (user) {
        if (user) {
            res.status(400).json({error: 'Username already in use!'}).end();
        }

        Models.User.create(userToAdd).then(function (user) {
            res.status(200).json(user).end();
        });
    });
});

// POST /users/authenticate
router.post('/authenticate', function (req, res, next) {
    // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
    var userToCheck = req.body;

    if (userToCheck == null || userToCheck.username == null || userToCheck.password == null) {
        res.send(403);
    } else {
        Models.User.findOne({
            where: {
                username: userToCheck.username,
                password: userToCheck.password
            }
        }).then(function (user) {
            if (user) {
                req.session.userId = user.id;
                res.status(200).json(user).end;
            } else {
                res.send(403);
            }
        });
    }
});

// GET /users/logged-in
router.get('/logged-in', function (req, res, next) {
    var loggedInId = req.session.userId ? req.session.userId : null;

    if (loggedInId == null) {
        res.json({error: 'No user logged in!'});
    } else {
        // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
        Models.User.findOne({
            where: {id: loggedInId}
        }).then(function (user) {
            res.status(200).json(user).end();
        });
    }
});

// GET /users/logout
router.get('/logout', function (req, res, next) {
    req.session.userId = null;

    res.send(200);
});

module.exports = router;
