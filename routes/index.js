var express = require('express');
var router = express.Router();
var uuid = require("node-uuid");
var userModule = require('../modules/userModule');
var appKey = '';
/* GET home page. */
router.get('/', function (req, res, next) {
    appKey = uuid.v1();
    res.render('index', {title: 'ERS-Home', Appkey: appKey});
});


/* ???? */
router.post('/api/v1/user', function (req, res, next) {
    userModule.createUser(req.body, function (err, result) {
        if (err) {
            res.send(err.message);
        } else {
            res.send(result);
        }
    });
});

/*????*/
router.get('/api/v1/user/:email/:pwd/:keyID', function (req, res, next) {
    var email = req.params.email;
    var password = req.params.pwd;
    //var keyID = req.params.keyID;
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

/*
 router.get('/api/users', function (reg, res, next) {
 userModule.findAllUsers(function (err, docs) {
 res.send(docs);
 });
 });
 */
/*
 router.delete('/v1/charts', function (reg, res, next) {
 chartModule.clearCollection(function (err, result) {
 res.status(204).send('No Content');
 });
 });
 router.delete('/v1/charts/:id', function (req, res, next) {
 let id = req.params.id;

 chartModule.remove(id, function (err, result) {
 console.log("Delete one chart,Result is:" + result);
 res.send(result);
 });
 });*/

module.exports = router;
