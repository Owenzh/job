/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var dbObj = new DB('tb_enterprise');
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

exports.findEnterpriseInfoById = function (uid, callback) {
    dbObj.findDocuments({"_id": ObjectId(uid)}, callback);
};


exports.updateEnterpriseInfo = function (data, callback) {
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
    var filter = {"_id": ObjectId(data._id)};
    var update = {
        $set: setObj
    };
    var options = {upsert: false};
    dbObj.updateOneDocument(filter, update, options, callback);
};