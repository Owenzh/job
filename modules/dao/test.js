var db = require('../../configs/dbConfig.js').dborm;
var Sequelize = require('sequelize');

// with password and options
var sequelize = new Sequelize(db.database, db.user, db.password, db.options);

var userExport = {};
var User = sequelize.import("../../modules/tables/user");
userExport.createUser = function () {
    User.sync({});

    console.log("test" + User);
};

userExport.addUser = function (idx) {
    //idx
    User.upsert({
        userId: "uid_" + idx,
        userName: "name_" + idx,
        userPhone: "up_" + idx,
        userDesc: "ud_desc_test_" + idx
    });
    console.log("add user....." + idx);
};

userExport.getUserList = function () {
    User.findAndCountAll().then(function (result) {
        console.log("all user count: " + result.count);
        console.log("all user rows: " + result.rows);
        var r = result.rows;
        console.log("**************DDD***********");
        for (var aa in r[0]) {
            console.log("In Row:" + aa + "===>" + aa);
        }
        console.log("**************WEE***********");
        console.log("^^^^"+JSON.stringify(r[0].dataValues));
        return result.rows;
    });
};

module.exports = userExport;