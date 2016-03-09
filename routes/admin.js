var express = require('express');
var router = express.Router();
var DB = require("../DBUtils/config.js");
var DBU = require("../DBUtils/DBAPI.js").DBU;
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

    var dbObj = new DBU(DB);
    dbObj.close();
    //dbObj.insertDocument()
    console.log(req.body.u_name);
    console.log(util.inspect(req.body));
    console.log(DB);
    res.send("add User...");
});

module.exports = router;
