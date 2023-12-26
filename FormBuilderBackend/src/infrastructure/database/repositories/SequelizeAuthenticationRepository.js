const BaseSequelizeRepository = require('./BaseSequelizeRepository');
const {
    Sequelize,
    Op
} = require("sequelize");

class SequelizeAuthenticationRepository extends BaseSequelizeRepository {

    constructor(entity) {
        super(entity);
    }

    async getUser(username) {
        let result = await database.queryModel.Users.findOne({
            where: {UserName: username},
        });
        return {
            data: result
        };
    }
}

module.exports = SequelizeAuthenticationRepository;