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