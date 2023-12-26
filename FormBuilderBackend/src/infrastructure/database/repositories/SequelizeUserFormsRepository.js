const BaseSequelizeRepository = require('./BaseSequelizeRepository');
const {
    Sequelize,
    Op
} = require("sequelize");

// This will support following database: (postgres, mysql2, mariadb, sqlite3, mssql, oracledb)
class SequelizeUserFormsRepository extends BaseSequelizeRepository {

    constructor(entity) {
        super(entity);
    }

    async create(query, body, options = {}) {
        return await super.create(query, body, options);
    }

    async update(query, condition, body, options = {}) {
        return await super.update(query, condition, body, options);
    }

    async delete(query, condition, options = {}) {
        return await super.delete(query, condition, options);
    }

    generateOptions(query, body) {
        let UserFormId,
            UserId,
            FormId,
            Data;
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
                UserFormId = filter.Values.find((value) => {
                    return value.Field === 'UserFormId';
                });
                if (UserFormId?.Value) {
                    rootFilters.push({
                        UserFormId: UserFormId.Type === database.DBOperation.LIKE ? {[Op.and]: [Sequelize.where(Sequelize.cast(Sequelize.col('UserFormId'), 'TEXT'), database.DBOperation.LIKE, UserFormId.Value)]} : {[database.compareType(UserFormId)]: UserFormId.Value}
                    });
                }
                // number
                UserId = filter.Values.find((value) => {
                    return value.Field === 'UserId';
                });
                if (UserId?.Value) {
                    rootFilters.push({
                        UserId: UserId.Type === database.DBOperation.LIKE ? {[Op.and]: [Sequelize.where(Sequelize.cast(Sequelize.col('UserId'), 'TEXT'), database.DBOperation.LIKE, UserId.Value)]} : {[database.compareType(UserId)]: UserId.Value}
                    });
                }
                // number
                FormId = filter.Values.find((value) => {
                    return value.Field === 'FormId';
                });
                if (FormId?.Value) {
                    rootFilters.push({
                        FormId: FormId.Type === database.DBOperation.LIKE ? {[Op.and]: [Sequelize.where(Sequelize.cast(Sequelize.col('FormId'), 'TEXT'), database.DBOperation.LIKE, FormId.Value)]} : {[database.compareType(FormId)]: FormId.Value}
                    });
                }
                // string
                Data = filter.Values.find((value) => {
                    return value.Field === 'Data';
                });
                if (Data?.Value) {
                    rootFilters.push({
                        Data: {
                            [database.compareType(Data)]: Data.Value
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

module.exports = SequelizeUserFormsRepository;