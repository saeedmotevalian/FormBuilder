const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Users', {
        UserId: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        UserName: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        PasswordSalt: {
            type: DataTypes.STRING(256),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Users',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "users_userid_uindex",
                unique: true,
                fields: [
                    {name: "UserId"},
                ]
            },
        ]
    });
};
