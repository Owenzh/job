/**
 * MongoDB DAO Interfaces[MGDAO]
 * Author:owen
 * Date: 2016-03-10
 */

var url = require("../DBUtils/config.js");
var MongoClient = require('mongodb').MongoClient;

var msgPreFix = "[MGDAO]***";

function MGDAO() {
    this.db = MongoClient.connect(url);
    console.info(msgPreFix + "MongoDB Instance created!");
}
//closeDB
MGDAO.prototype.closeDB = function () {
    if (this.db) {
        this.db.then(function (_db) {
            _db.close();
            console.info(msgPreFix + "MongoDB Instance close!");
        });
    } else {
        console.error(msgPreFix + "MongoDB Instance null!");
    }
};
//findDocuments
//filters {} will return all documents
MGDAO.prototype.findDocuments = function (collectionName, filters, callback) {
    this.db.then(function (_db) {
        var cursor = _db.collection(collectionName).find(filters);
        cursor.toArray(function (err, docs) {
            if (err) {
                console.info(msgPreFix + "Query documents error>>> " + err.toString());
            } else {
                callback(err, docs);
                console.info(msgPreFix + "Query documents from " + collectionName);
            }
        });
    });
};

//insertDocuments
MGDAO.prototype.insertDocuments = function (collectionName, dataArr, callback) {
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.insertMany(dataArr).then(function (r) {
            callback(r);
            console.info(msgPreFix + "Insert documents into " + collectionName);
        });
    });
};

//updateOneDocument
MGDAO.prototype.updateOneDocument = function (collectionName, filter, update, options, callback) {
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.updateOne(filter, update, options, function (err, r) {
            callback(err, r);
            console.info(msgPreFix + "Update one document from " + collectionName);
        });
    });
};

//updateManyDocuments
MGDAO.prototype.updateManyDocuments = function (collectionName, filter, update, options, callback) {
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.updateMany(filter, update, options, function (err, r) {
            callback(err, r);
            console.info(msgPreFix + "Update many documents from " + collectionName);
        });
    });
};

//deleteOneDocument
MGDAO.prototype.deleteOneDocument = function (collectionName, filter, options, callback) {
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.deleteOne(filter, options, function (err, r) {
            callback(err, r);
            console.info(msgPreFix + "Delete one document from " + collectionName);
        })
    });
};

//deleteManyDocuments
MGDAO.prototype.deleteManyDocuments = function (collectionName, filter, options, callback) {
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.deleteMany(filter, options, function (err, r) {
            callback(err, r);
            console.info(msgPreFix + "Delete many documents from " + collectionName);
        })
    });
};

module.exports.MGDAO = MGDAO;