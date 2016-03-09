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

//var DBU = {};
//DBU.connectDB = function(dbConfig){
//    DBU.url = dbConfig.url;
//    MongoClient.connect(DBU.url).then(function(_db){
//        console.log("DB connected...");
//        DBU.db_instance = _db;
//    });
//};
//function DBU (dbConfig) {
//    DBU.uri = dbConfig.url;
//    var init = function () {
//        return MongoClient.connect(DBU.uri);
//    };
//    init().then(function (_db) {
//        console.log("DB instance...");
//        DBU.db = _db;
//    });
//};
//DBU.prototype.insertDocument = function () {
//    console.log("this is insertDocument function:::" + DBU.url);
//};


//var DBU = (function(){
//    var DBU = function (dbConfig){
//        var connectDB = function(dbConfig){
//            DBU.url = dbConfig.url;
//            MongoClient.connect(DBU.url).then(function(_db){
//                console.log("DB connected...");
//                DBU.db_instance = _db;
//            });
//        };
//    };
//    DBU.prototype.insertDocument = function () {
//        console.log("this is insertDocument function:::" + DBU.url);
//    };
//
//    return function(dbConfig){
//        return new DBU(dbConfig);
//    }
//})();


//var K = {};
//
//K.DBU = function(dbConfig){
//    this.url = dbConfig.url;
//    (function(){
//        MongoClient.connect(K.DBU.url).then(function(_db){
//            console.log("DB connected...");
//            K.DBU.db_instance = _db;
//        });
//    }).apply(this);
//}
//K.DBU.prototype.insertDocument = function () {
//    console.log("this is insertDocument function:::" + K.DBU.url);
//};

//function K() {
//    console.log("loading K lib");
//    var DBU = function (dbConfig) {
//        this.url = dbConfig.url;
//        (function () {
//            MongoClient.connect(DBU.url).then(function (_db) {
//                console.log("DB connected...");
//                DBU.db_instance = _db;
//            });
//        }).apply(this);
//    };
//    DBU.insertDocument = function () {
//        console.log("this is insertDocument function:::" + DBU.url);
//    };
//    return function (dbConfig) {
//        return new DBU(dbConfig);
//    };
//}

//function K() {
//    console.log("loading K lib...");
//    var DBU = {};
//    DBU.connectDB = function (dbConfig) {
//        DBU.url = dbConfig.url;
//        console.log("connecting db...");
//        MongoClient.connect(DBU.url).then(function (_db) {
//            console.log("DB connected...");
//            DBU.db_instance = _db;
//        });
//    };
//    return DBU;
//}

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