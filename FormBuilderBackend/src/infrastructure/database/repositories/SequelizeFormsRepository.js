const BaseSequelizeRepository = require('./BaseSequelizeRepository');
const {
    Sequelize,
    Op
} = require("sequelize");

// This will support following database: (postgres, mysql2, mariadb, sqlite3, mssql, oracledb)
class SequelizeFormsRepository extends BaseSequelizeRepository {

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
        let FormId,
            Json;
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
                FormId = filter.Values.find((value) => {
                    return value.Field === 'FormId';
                });
                if (FormId?.Value) {
                    rootFilters.push({
                        FormId: FormId.Type === database.DBOperation.LIKE ? {[Op.and]: [Sequelize.where(Sequelize.cast(Sequelize.col('FormId'), 'TEXT'), database.DBOperation.LIKE, FormId.Value)]} : {[database.compareType(FormId)]: FormId.Value}
                    });
                }
                // string
                Json = filter.Values.find((value) => {
                    return value.Field === 'Json';
                });
                if (Json?.Value) {
                    rootFilters.push({
                        Json: {
                            [database.compareType(Json)]: Json.Value
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

module.exports = SequelizeFormsRepository;