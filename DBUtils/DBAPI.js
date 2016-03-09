/**
 * Created by admin on 2016/2/21.
 */
var MongoClient = require('mongodb').MongoClient;
var API = {};
API.insertDocument = function (db, collectionName, dataArr, callback) {
    if (dataArr instanceof Array) {
        db.collection(collectionName).insertMany(dataArr, function (err, result) {
            console.log('Insert one document into ' + collectionName);
            callback();
        });
    } else {
        throw 'dataArr must be array!';
    }
};

function DBU(dbconfig) {
    this.url = dbconfig.url || "";
    this.db = MongoClient.connect(this.url);//Promise Object
    console.log("Init DB ...." + this.db);
}
DBU.prototype.insertDocument = function (collectionName, dataArr, callback) {
    this.db.then(function (_db) {
        var col = _db.collection(collectionName)
        col.insertMany(dataArr).then(function (r) {
            callback(r);
        });
    });
};
DBU.prototype.close = function () {
    if (this.db) {
        this.db.then(function (_db) {
            _db.close();
            console.log("close DB...");
        });
    }
}

module.exports.DBU = DBU;