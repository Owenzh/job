/**
 * @file index.js
 * @author owen
 * @desc for restful api
 * @date 2016/08/05
 * @version 1.0
 * */
var express = require('express');
var router = express.Router();
var userModule = require('../modules/userModule');

/*
* RestFul API Base Guide.
* Verbs: GET,POST,PUT,DELETE
*       -GET:               Read resources.
*       -POST:              Create a new resource.
*       -PUT:               Update exited resources by Unique ID.
*       -DELETE:            Delete resources.
*
* */
/**
 * GET home page.
 * */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ERS-Home'});
});


/**
 * create user with user object (json format).
 * */
router.post('/api/v1/user', function (req, res, next) {
    console.log("/api/v1/user.....");
    userModule.createUser(req.body, function (err, result) {
        if (err) {
            res.send(err.message);
        } else {
            res.send(result);
        }
    });
});

/**
 * read user via email and password.
 * */
router.get('/api/v1/user/:email/:pwd', function (req, res, next) {
    var email = req.params.email;
    var password = req.params.pwd;
    console.log(email + "#" + password);
    userModule.searchUser({email: email, password: password}, function (err, docs) {
        if (err || docs.length == 0) {
            console.log("Error or Not found");
            res.send({s: 0, d: []});
        } else {
            console.log("Found User");
            res.send({s: 1, d: docs});
        }
    });
});

/**
 * Update user by user email
 * */
router.put('/api/v1/user/:email',function(req, res, next){
    console.log("update user");
});



module.exports = router;
