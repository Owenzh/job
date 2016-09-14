/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var moment = require('moment');
var iconv = require('iconv-lite');
//var dbObj = new DB('tb_user');
var dbObj = new DB('tb_auths');

function decodeParameters(obj) {
    var _tmp = obj;
    for (var i in _tmp) {
        _tmp[i] = decodeURIComponent(_tmp[i]);
        //_tmp[i] = unescape(_tmp[i]);
        console.log(_tmp[i]);
    }
    return _tmp;
}

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

/*
 _id: "57b30527d7f9838c0bce460c"
 address_detail
 city
 district
 e_assets
 e_businessCategoryMain
 e_businessCategorySub
 e_culture
 e_establishmentDate
 e_person
 e_realName
 e_registerNumber
 email
 password
 policy
 province
 type
 */
exports.createUser = function (data, callback) {
    try {
        dbObj.insertDocuments(data, callback);
    } catch (e) {
        console.log(e);
    }
};
exports.findUser = function (filters, callback) {
    dbObj.findDocuments(filters, callback);
};

exports.findUserInfoById = function (uid, callback) {
    dbObj.findDocuments({"_id": ObjectId(uid)}, callback);
};


exports.updateUserInfo = function (data, callback) {
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
    var updateDate = new Date().getTime();
    var filter = {"_id": ObjectId(data.id)};
    var update = {
        $set: {isNew: false, info: setObj, updateDate: updateDate}
    };
    var options = {upsert: false};
    dbObj.updateOneDocument(filter, update, options, callback);
};


exports.updateEnterpriseInfo = function (data, callback) {
    var setObj = {
        has_info: 1,
        type: data.type,
        province: data.province,
        city: data.city,
        district: data.district,
        address_detail: data.address_detail,
        email: data.email,
        e_assets: data.e_assets,
        e_businessCategoryMain: data.e_businessCategoryMain,
        e_businessCategorySub: data.e_businessCategorySub,
        e_culture: data.e_culture,
        e_establishmentDate: data.e_establishmentDate,
        e_person: data.e_person,
        e_realName: data.e_realName,
        e_registerNumber: data.e_registerNumber
    };
    var updateDate = new Date().getTime();
    var filter = {"_id": ObjectId(data.id)};
    var update = {
        $set: {isNew: false, info: setObj, updateDate: updateDate}
    };
    var options = {upsert: false};
    dbObj.updateOneDocument(filter, update, options, callback);
};