var dbConfigDefault = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'store'
};
var dbConfigPool = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'store'
};

var dbORM = {
    database: 'job',
    user: 'root',
    password: 'root',
    options: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000,
            validateConnection:function(v){
                console.log("VVV "+v);
            }
        },
        logging:function(log){
            console.log('SQL: '+log);
        }
    }
};

var dbConfig = {
    default: dbConfigDefault,
    pool: dbConfigPool,
    dborm: dbORM
};
module.exports = dbConfig;