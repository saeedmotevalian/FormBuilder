const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Forms', {
        FormId: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        Json: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        UserId: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'Forms',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "forms_formid_uindex",
                unique: true,
                fields: [
                    {name: "FormId"},
                ]
            },
        ]
    });
};
