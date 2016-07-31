/**
 * Created by XZhang21 on 7/7/2016.
 */
var ObjectId = require('mongodb').ObjectId;
var DB = require('../DBUtils/DBAPI').MGDAO;
var dbObj = new DB('tb_user');
exports.createUser = function(data, callback) {
    console.log("createUser***"+data);
    try{
    dbObj.insertDocuments(data, callback);
    }catch (e){
        console.log(e);
    }
    //console.log("createUser***"+data);
};
exports.searchUser = function(filters, callback){
    dbObj.findDocuments(filters, callback);
};