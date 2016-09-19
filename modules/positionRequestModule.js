/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var dbObj = new DB('tb_position_request');
exports.createPositionRequest = function (data, callback) {
    try {
        dbObj.insertDocuments(data, callback);
    } catch (e) {
        console.log(e);
    }
};

exports.getAllPositions = function (callback) {
    dbObj.findDocuments({"p_status": "1"}, callback);
};
exports.findPositionRequestByEId = function (eid, callback) {
    dbObj.findDocuments({"e_id": eid}, callback);
};

exports.findPositionRequestByRID = function (rid, callback) {
    dbObj.findDocuments({"_id": ObjectId(rid)}, callback);
};

/*
exports.deletePositionByPId = function (pid,options, callback) {
    dbObj.deleteOneDocument({"_id": ObjectId(pid)},options, callback);
};
exports.frozenPosition = function (data, callback) {
    var filter = {"_id": ObjectId(data.id)};
    var update = {
        $set: {p_status:"0"}
    };
    var options = {upsert: false};
    dbObj.updateOneDocument(filter, update, options, callback);
};
exports.unfrozenPosition = function (data, callback) {
    var filter = {"_id": ObjectId(data.id)};
    var update = {
        $set: {p_status:"1"}
    };
    var options = {upsert: false};
    dbObj.updateOneDocument(filter, update, options, callback);
};*/