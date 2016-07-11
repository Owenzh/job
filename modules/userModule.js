/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var dbObj = new DB('tb_user');
exports.createUser = function(data, callback){
    dbObj.insertDocuments(data, callback);
    //console.log("createUser***"+data);
};
exports.searchUser = function(filters, callback){
    dbObj.findDocuments(filters, callback);
};