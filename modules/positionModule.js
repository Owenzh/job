/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var dbObj = new DB('tb_position');
exports.createPosition = function (data, callback) {
    try {
        dbObj.insertDocuments(data, callback);
    } catch (e) {
        console.log(e);
    }
};

exports.findPositionInfoByEId = function (eid, callback) {
    dbObj.findDocuments({"e_id": eid}, callback);
};
exports.findPositionInfoByPId = function (pid, callback) {
    dbObj.findDocuments({"_id": ObjectId(pid)}, callback);
};
exports.deletePositionByPId = function (pid,options, callback) {
    dbObj.deleteOneDocument({"_id": ObjectId(pid)},options, callback);
};