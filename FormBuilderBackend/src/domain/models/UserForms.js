const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserForms', {
        UserFormId: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'UserId'
            }
        },
        FormId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'Forms',
                key: 'FormId'
            }
        },
        Data: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'UserForms',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "userforms_pk",
                unique: true,
                fields: [
                    {name: "UserFormId"},
                ]
            },
        ]
    });
};
