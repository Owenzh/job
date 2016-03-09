var user = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        idx: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userName: {type: DataTypes.STRING(100), allowNull: false, primaryKey: true, field: "user_name"},
        userPwd: {type: DataTypes.STRING(100), allowNull: false, field: "user_pwd"},
        userMail: {type: DataTypes.STRING(200), allowNull: false, field: "user_email"},
        userType: {type: DataTypes.STRING(10), allowNull: false, field: "user_type"}
    }, {
        timestamps: true,
        tableName: "tb_user"
    })
};

module.exports = user;