var DataTypes = require("sequelize").DataTypes;
var _Forms = require("./Forms");
var _UserForms = require("./UserForms");
var _Users = require("./Users");

function initModels(sequelize) {
    var Forms = _Forms(sequelize, DataTypes);
    var UserForms = _UserForms(sequelize, DataTypes);
    var Users = _Users(sequelize, DataTypes);

    UserForms.belongsTo(Forms, {
        as: "Form",
        foreignKey: "FormId"
    });
    Forms.hasMany(UserForms, {
        as: "UserForms",
        foreignKey: "FormId"
    });
    UserForms.belongsTo(Users, {
        as: "User",
        foreignKey: "UserId"
    });
    Users.hasMany(UserForms, {
        as: "UserForms",
        foreignKey: "UserId"
    });

    return {
        Forms,
        UserForms,
        Users,
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
