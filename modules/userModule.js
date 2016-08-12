/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var dbObj = new DB('tb_user');
exports.createUser = function (data, callback) {
    console.log("createUser***" + data);
    try {
        dbObj.insertDocuments(data, callback);
    } catch (e) {
        console.log(e);
    }
    //console.log("createUser***"+data);
};
exports.findUser = function (filters, callback) {
    dbObj.findDocuments(filters, callback);
};

exports.findUserInfoById = function (uid, callback) {
    console.log("****findUserInfoById******");
    dbObj.findDocuments({"_id": ObjectId(uid)}, callback);
};


exports.updateUserInfo = function (data, callback) {
    /*
     type
     typeName

     province
     city
     district
     address_detail

     nick_name
     real_name
     birthday
     phone
     email

     status
     graduate_day
     position_title
     work_years
     */
    var setObj = {
        has_info: 1,
        type: data.type,
        typeName: data.typeName,
        province: data.province,
        city: data.city,
        district: data.district,
        address_detail: data.address_detail,
        nick_name: data.nick_name,
        real_name: data.real_name,
        birthday: data.birthday,
        phone: data.phone,
        email: data.email,
        status: data.status,
        graduate_day: data.graduate_day,
        position_title: data.position_title,
        work_years: data.work_years
    };
    var filter = {"_id": ObjectId(data._id)};
    var update = {
        $set: setObj
    };
    var options = {upsert: false};
    dbObj.updateOneDocument(filter, update, options, callback);
};