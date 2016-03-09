var db = require('../../configs/dbConfig.js');
var mysql = require('mysql');
var dao = {};

/*default
var conn = mysql.createConnection(db.default);
conn.connect();

dao.search = function (sql, callback) {
    conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
        if (callback) callback(rows);
        conn.end();
    });
};
*/
var connPool = mysql.createPool(db.pool);
/*
* CRUD
* C--Insert
* R--Search
* U--Update
* D--Delete
* */
/*
* sqlConfig
* -table
* -
* */
dao.insertDB = function(sqlConfig){
    connPool.getConnection(function (err, connection) {
        if(err) throw err;

    });
};


dao.searchPool = function (sql, callback) {
    connPool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err;
            if (callback) callback(rows);
            connection.release();
        });
    });
};
//INSERT INTO tutorials_tbl
dao.insert = function (sql, callback) {
    connPool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err;
            if (callback) callback(rows);
            connection.release();
        });
    });
};


module.exports = dao;