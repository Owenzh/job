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
//****************************Common api****************************//
router.get('/api/v1/address', function (req, res, next) {
    var addressJSON = require('../resources/static/address.json');
    res.send({s: 1, d: addressJSON});
});

//****************************User parts api****************************//

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
    //console.log(email + "#" + password);
    userModule.findUser({email: email, password: password}, function (err, docs) {
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
 * update user information.
 * */
router.put('/api/v1/user_info', function (req, res, next) {
    //console.log("/api/v1/user/info.....");
    //filter, update, options, callback
    var requestData = req.body;
    userModule.updateUserInfo(requestData, function (err, result) {
        if (err) {
            res.send({s: 0, d: err.message});
        } else {
            res.send({s: 1, d: result});
        }
    });
});


/**
 * read user info via email and password.
 * */
router.get('/api/v1/user_info/:uid', function (req, res, next) {
    var uid = req.params.uid;
    console.log("uid==="+uid);
    userModule.findUserInfoById(uid, function (err, docs) {
        if (err || docs.length == 0) {
            console.log("Error or Not found#####");
            res.send({s: 0, d: []});
        } else {
            console.log("Found User&&&&&&");
            res.send({s: 1, d: docs[0]});

        }
    });
});

/**
 * Update user by user email
 * */
router.put('/api/v1/user/:email', function (req, res, next) {
    console.log("update user");
});
/**
 * Delete user by user id
 * */
router.delete('/api/v1/user/:uid', function (req, res, next) {
    console.log("delete user");
});

/**
 * Create user resume
 * */
router.post('/api/v1/resume', function (req, res, next) {
    console.log("create resume");
});

/**
 * Update user resume by user email
 * */
router.put('/api/v1/resume/:email', function (req, res, next) {
    console.log("update resume");
});

/**
 * Get all positions
 * */
router.get('/api/v1/positions', function (req, res, next) {
    console.log("get positions");
});
/**
 * Create position request
 * */
router.post('/api/v1/position_request', function (req, res, next) {
    console.log("create position_request");
});

/**
 * Create position collection
 * */
router.post('/api/v1/position_collection', function (req, res, next) {
    console.log("create position_collection");
});

/**
 * Create comment for interview
 * */
router.post('/api/v1/comment', function (req, res, next) {
    console.log("create comment");
});

//****************************Enterprise parts api****************************//

/**
 * Create enterprise user
 * */
router.post('/api/v1/enterprise', function (req, res, next) {
    console.log("create enterprise");
});

/**
 * read enterprise via email and password.
 * */
router.get('/api/v1/enterprise/:email/:pwd', function (req, res, next) {
    console.log("login enterprise");
});

/**
 * Update enterprise user information
 * */
router.put('/api/v1/enterprise', function (req, res, next) {
    console.log("update enterprise");
});

/**
 * Create position
 * */
router.post('/api/v1/position', function (req, res, next) {
    console.log("create position");
});

/**
 * Update position
 * */
router.put('/api/v1/position', function (req, res, next) {
    console.log("update position");
});
/**
 * Frozen position
 * */
router.put('/api/v1/position/frozen', function (req, res, next) {
    console.log("frozen position");
});
/**
 * Start position
 * */
router.put('/api/v1/position/start', function (req, res, next) {
    console.log("start position");
});

/**
 * Delete position
 * */
router.delete('/api/v1/position/:id', function (req, res, next) {
    console.log("delete position");
});

/**
 * Send interview request to user
 * */
router.post('/api/v1/interview', function (req, res, next) {
    console.log("send interview");
});
/**
 * Update interview result
 * */
router.put('/api/v1/interview', function (req, res, next) {
    console.log("update interview result");
});
/**
 * Add talent into enterprise db
 * */
router.post('/api/v1/talent', function (req, res, next) {
    console.log("add talent");
});

//****************************App search api****************************//
/**
 * search positions
 * */
router.get('/api/v1/positions/:q', function (req, res, next) {
    console.log("search positions");
});

/**
 * search users for enterprise talent
 * */
router.get('/api/v1/users/:q', function (req, res, next) {
    console.log("search users");
});


module.exports = router;
