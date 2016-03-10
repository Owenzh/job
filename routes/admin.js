var express = require('express');
var router = express.Router();
var MGDAO = require("../DBUtils/DBAPI.js").MGDAO;
var util = require("util");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin_index', {title: "招聘后台"});
});
router.post('/user/add', function (req, res) {

    //var MongoClient = require('mongodb').MongoClient;
    //var assert = require('assert');
    //var url = 'mongodb://localhost:27017/job';
    //MongoClient.connect(url, function (err, db) {
    //    assert.equal(null, err);
    //    console.log("Connected correctly to db server.");
    //    db.close();
    //});
    //MongoClient.connect(url).then(function(db){
    //   console.log("Promise db connect!");
    //    db.close();
    //});

    var dbObj = new MGDAO();
    dbObj.forceClose();
    //dbObj.insertDocument()
    console.log(req.body.u_name);
    //console.log(util.inspect(req.body));
    res.send("add User...");
});

/* GET for debug. */
router.get('/debug', function (req, res, next) {
    var tb = 'tb_test';
    var testData = [
        {
            timeTick: new Date().getTime(),
            debug: 'y',
            author: 'owen'
        },
        {
            timeTick: new Date().getTime(),
            debug: 'y',
            author: 'tester'
        }
    ];
    var dao = new MGDAO();
    dao.insertDocuments(tb, [testData[1]], function (r) {
        //console.log(util.inspect(r));
        dao.findDocuments(tb, {}, function (err, docs) {
            console.log(docs.length);
            dao.closeDB();
            res.send("debug");
        })

    });


});

module.exports = router;
