var db = require('../../configs/dbConfig.js').dborm;
var Sequelize = require('sequelize');

// with password and options
var sequelize = new Sequelize(db.database, db.user, db.password, db.options);
var userExport = {};
var User = sequelize.import("../../modules/tables/user");
userExport.createUser = function () {
    User.sync({force: true});
    console.log("test" + User);
};

userExport.addUser = function (_user) {
    //userName userPwd userMail userType
    return User.upsert(_user);
};

userExport.delUser = function (_userName) {
   return User.destroy({where: {userName: _userName}});
};
//TODO 回调嵌套如何解决
userExport.getUserList = function (callback, error) {
    User.findAndCountAll({
        attributes: ['idx', 'userName', 'userMail', 'userType', 'createdAt'],
        //limit: 3
    }).then(function (result) {
        var r = result.rows;
        var result_json = {
            res: 1,
            data: r,
            count: result.count
        };
        return result_json;
    }).then(function (resultJSON) {
        if (typeof callback === "function") {
            callback(resultJSON);
        }
    }).catch(function (err) {
        if (typeof error === "function") {
            error(err);
        }
    });

};

userExport.getUserById = function () {
    return User.findAndCountAll();
};

module.exports = userExport;