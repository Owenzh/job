var express = require('express');
var router = express.Router();
//var userModule = require('../modules/userModule');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin_index', {title: "招聘后台"});
});

//****************************Operation parts api****************************//

/**
 * Create admin user
 * */
router.post('/api/v1/admin',function(req, res, next){
    console.log("create admin");
});

/**
 * read admin via email and password.
 * */
router.get('/api/v1/admin/:email/:pwd', function (req, res, next) {
    console.log("login admin");
});


/**
 * get all enterprise users
 * */
router.get('/api/v1/enterprises', function (req, res, next) {
    console.log("get all enterprise");
});
/**
 * get all enterprise users that not pass verify by admin
 * */
router.get('/api/v1/enterprises/unchecked', function (req, res, next) {
    console.log("get all enterprise");
});
/**
 * pass check enterprise users
 * */
router.put('/api/v1/enterprises/checked', function (req, res, next) {
    console.log("pass check for enterprise");
});

/**
 * Create system information
 * */
router.post('/api/v1/system/information',function(req, res, next){
    console.log("create system information");
});

/**
 * Update system information
 * */
router.put('/api/v1/system/information', function (req, res, next) {
    console.log("update system information");
});

//****************************Admin parts api****************************//

/**
 * update enterprise users
 * */
router.put('/api/v1/enterprise/:id', function (req, res, next) {
    console.log("update enterprise");
});
/**
 * delete enterprise users
 * */
router.delete('/api/v1/enterprise/:id', function (req, res, next) {
    console.log("delete enterprise");
});

/**
 * get all operation users.
 * */
router.get('/api/v1/admin/operations', function (req, res, next) {
    console.log("get operation");
});
/**
 * delete operation user.
 * */
router.delete('/api/v1/admin/operation/:email', function (req, res, next) {
    console.log("delete operation");
});


module.exports = router;
