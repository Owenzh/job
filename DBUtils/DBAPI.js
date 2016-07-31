/**
 * MongoDB DAO Interfaces[MGDAO]
 * Author:owen
 * Date: 2016-03-10
 */

//var url = require("../DBUtils/config.js");
var url = "mongodb://localhost:27017/job";
var MongoClient = require('mongodb').MongoClient;

var msgPreFix = "[MongoDBInfo] ";

function MGDAO() {
    console.info(msgPreFix + "MongoDB Instance initializing!");
    this.db = null;
    this.collectionName = null;
    this.openDB();
    this.setCollectionName(arguments[0] || '');
}
MGDAO.prototype.openDB = function () {
    if (!this.db) {
        this.db = MongoClient.connect(url);
        console.info(msgPreFix + "MongoDB Instance connecting!");
    }
};
//closeDB
MGDAO.prototype.closeDB = function () {
    var mgdao = this;
    if (this.db) {
        this.db.then(function (_error,_db) {
            _db.close();
            console.info(msgPreFix + "MongoDB Instance close!");
            mgdao.db = null;
        });
    } else {
        console.error(msgPreFix + "MongoDB Instance null!");
    }
};
MGDAO.prototype.setCollectionName = function () {
    if (arguments[0] && arguments[0] != '') {
        this.collectionName = arguments[0];
    } else {
        throw 'collection name is null.';
    }
};
//findDocuments
//filters {} will return all documents
MGDAO.prototype.findDocuments = function () {
    var collectionName, filters, callback;
    if (arguments.length == 3) {
        collectionName = arguments[0];
        filters = arguments[1];
        callback = arguments[2];
    } else if (arguments.length == 2) {
        collectionName = this.collectionName;
        filters = arguments[0];
        callback = arguments[1];
    } else {
        throw 'DBAPI arguments error.';
    }
    this.openDB();
    this.db.then(function (_db) {
        var cursor = _db.collection(collectionName).find(filters);
        cursor.toArray(function (err, docs) {
            if (err) {
                console.log(msgPreFix + "Query documents error>>> " + err.toString());
            } else {
                callback(err, docs);
                console.log(msgPreFix + "Query documents from " + collectionName);
            }
        });
    });
};

//insertDocuments
MGDAO.prototype.insertDocuments = function () {
    var collectionName, dataArr, callback;
    if (arguments.length == 3) {
        collectionName = arguments[0];
        dataArr = arguments[1];
        callback = arguments[2];
    } else if (arguments.length == 2) {
        collectionName = this.collectionName;
        dataArr = arguments[0];
        callback = arguments[1];
    } else {
        throw 'DBAPI arguments error.';
    }
    this.openDB();
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.insertMany(dataArr).then(function (r) {
            callback(r);
            console.log(msgPreFix + "Insert documents into " + collectionName);
        });
    });
};

//updateOneDocument
MGDAO.prototype.updateOneDocument = function () {
    var collectionName, filter, update, options, callback;
    if (arguments.length == 5) {
        collectionName = arguments[0];
        filter = arguments[1];
        update = arguments[2];
        options = arguments[3];
        callback = arguments[4];

    } else if (arguments.length == 4) {
        collectionName = this.collectionName;
        filter = arguments[0];
        update = arguments[1];
        options = arguments[2];
        callback = arguments[3];
    } else {
        throw 'DBAPI arguments error.';
    }
    this.openDB();
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.updateOne(filter, update, options, function (err, r) {
            callback(err, r);
            console.log(msgPreFix + "Update one document from " + collectionName);
        });
    });
};

//updateManyDocuments
MGDAO.prototype.updateManyDocuments = function () {
    var collectionName, filter, update, options, callback;
    if (arguments.length == 5) {
        collectionName = arguments[0];
        filter = arguments[1];
        update = arguments[2];
        options = arguments[3];
        callback = arguments[4];

    } else if (arguments.length == 4) {
        collectionName = this.collectionName;
        filter = arguments[0];
        update = arguments[1];
        options = arguments[2];
        callback = arguments[3];
    } else {
        throw 'DBAPI arguments error.';
    }
    this.openDB();
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.updateMany(filter, update, options, function (err, r) {
            callback(err, r);
            console.log(msgPreFix + "Update many documents from " + collectionName);
        });
    });
};

//deleteOneDocument
MGDAO.prototype.deleteOneDocument = function () {
    var collectionName, filter, options, callback;
    if (arguments.length == 4) {
        collectionName = arguments[0];
        filter = arguments[1];
        options = arguments[2];
        callback = arguments[3];

    } else if (arguments.length == 3) {
        collectionName = this.collectionName;
        filter = arguments[0];
        options = arguments[1];
        callback = arguments[2];
    } else {
        throw 'DBAPI arguments error.';
    }
    this.openDB();
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.deleteOne(filter, options, function (err, r) {
            callback(err, r);
            console.log(msgPreFix + "Delete one document from " + collectionName);
        });
    });
};

//deleteManyDocuments
MGDAO.prototype.deleteManyDocuments = function () {
    var collectionName, filter, options, callback;
    if (arguments.length == 4) {
        collectionName = arguments[0];
        filter = arguments[1];
        options = arguments[2];
        callback = arguments[3];

    } else if (arguments.length == 3) {
        collectionName = this.collectionName;
        filter = arguments[0];
        options = arguments[1];
        callback = arguments[2];
    } else {
        throw 'DBAPI arguments error.';
    }
    this.openDB();
    this.db.then(function (_db) {
        var col = _db.collection(collectionName);
        col.deleteMany(filter, options, function (err, r) {
            callback(err, r);
            console.log(msgPreFix + "Delete many documents from " + collectionName);
        });
    });
};

module.exports.MGDAO = MGDAO;