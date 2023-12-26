const BaseSequelizeRepository = require('./BaseSequelizeRepository');
const {
    Sequelize,
    Op
} = require("sequelize");

// This will support following database: (postgres, mysql2, mariadb, sqlite3, mssql, oracledb)
class SequelizeUsersRepository extends BaseSequelizeRepository {

    constructor(entity) {
        super(entity);
    }

    async create(query, body, options = {}) {
        return await super.create(query, body, options);
    }

    async createWithoutLimit(body, options = {}) {
        let result = await database.commandModel.Users.create(body, options);
        if (result) {
            return {
                dataValues: result.dataValues,
                previousDataValues: null
            };
        } else {
            return {
                dataValues: null,
                previousDataValues: null
            };
        }
    }

    async update(query, condition, body, options = {}) {
        return await super.update(query, condition, body, options);
    }

    async delete(query, condition, options = {}) {
        return await super.delete(query, condition, options);
    }

    generateOptions(query, body) {
        let UserId,
            UserName,
            Password,
            PasswordSalt;
        let extra = query.extra;
        let order = [];
        if ((body.Order ?? {}).Field) {
            for (const field of (body.Order ?? {}).Field.split(",")) {
                let openExtra = field.split('.');
                let accumulator = '';
                for (let i = 0; i < openExtra.length - 1; i++) {
                    accumulator += `${openExtra[i]}`;
                    extra += `,${accumulator}`;
                    accumulator += ".";
                }

                order.push([Sequelize.col(field), ((body.Order ?? {}).Type === 'DESC') ? 'DESC' : 'ASC']);
            }
        }

        let filters = {};
        let logicalFilters = [];
        let rootFilters = [];
        if (body.Filter) {
            let filter = body.Filter;
            if ((filter.Values ?? []).length > 0) {
                // number
                UserId = filter.Values.find((value) => {
                    return value.Field === 'UserId';
                });
                if (UserId?.Value) {
                    rootFilters.push({
                        UserId: UserId.Type === database.DBOperation.LIKE ? {[Op.and]: [Sequelize.where(Sequelize.cast(Sequelize.col('UserId'), 'TEXT'), database.DBOperation.LIKE, UserId.Value)]} : {[database.compareType(UserId)]: UserId.Value}
                    });
                }
                // string
                UserName = filter.Values.find((value) => {
                    return value.Field === 'UserName';
                });
                if (UserName?.Value) {
                    rootFilters.push({
                        UserName: {
                            [database.compareType(UserName)]: UserName.Value
                        }
                    });
                }
                // string
                Password = filter.Values.find((value) => {
                    return value.Field === 'Password';
                });
                if (Password?.Value) {
                    rootFilters.push({
                        Password: {
                            [database.compareType(Password)]: Password.Value
                        }
                    });
                }
                // string
                PasswordSalt = filter.Values.find((value) => {
                    return value.Field === 'PasswordSalt';
                });
                if (PasswordSalt?.Value) {
                    rootFilters.push({
                        PasswordSalt: {
                            [database.compareType(PasswordSalt)]: PasswordSalt.Value
                        }
                    });
                }

                if (filter.Type === 'OR') {
                    filters = {[Op.or]: rootFilters};
                } else {
                    filters = {[Op.and]: rootFilters};
                }
            }
        }
        let include = [];
        if (extra) {
        }

        let options = {
            include: include,
            where: [filters, logicalFilters],
            order: order.length > 0 ? [order] : []
        };
        if (query.RequestType !== 'ALL' && query.RequestType !== 'ONE') {
            options.offset = (query?.pagination?.offset) ?? 0;
            options.limit = ((query?.pagination?.limit) ?? 10) - ((query?.pagination?.offset) ?? 0);
            options.distinct = true;
        }
        return options;
    }

    async get(query, body) {
        let options = this.generateOptions(query, body);
        return await super.get(query, options);
    }
}

module.exports = SequelizeUsersRepository;