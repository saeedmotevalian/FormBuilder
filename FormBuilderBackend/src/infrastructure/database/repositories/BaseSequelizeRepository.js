const CacheMiddleware = require('../../../interfaces/middleware/CacheMiddleware');
const {generateUniqueKey} = require("../../util/CacheIdentifier");
const {
    Op
} = require("sequelize");
const SqlString = require('sequelize/lib/sql-string');

class BaseSequelizeRepository {

    constructor(entity) {
        this.entity = entity;
    }

    ignoreEntity() {
        return ['Users'].includes(this.entity);
    }

    async deleteCacheDatabase(entity) {
        switch (entity.toUpperCase()) {
        }
    }

    generateLogicFilter(query) {
        let logicFilters = [];
        logicFilters.push({
            UserId: {
                [Op.eq]: query?.xuser?.UserId
            }
        });
        return logicFilters;
    }

    async create(query, body, options = {}) {
        body.UserId = query?.xuser?.UserId;
        let result = await database.commandModel[this.entity].create(body, options);
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
        let result = await database.commandModel[this.entity].findOne({
            where: [condition, (!this.ignoreEntity()) ? {[Op.and]: this.generateLogicFilter(query)} : {}]
        });
        if (result) {
            let previousDataValues = {...result.dataValues};
            for (const [key, value] of Object.entries(body)) {
                if (value) {
                    result[key] = value;
                }
            }
            await result.save(options);
            await this.deleteCacheDatabase(this.entity);
            return {
                dataValues: result,
                previousDataValues: previousDataValues
            };
        } else {
            return {
                dataValues: null,
                previousDataValues: null
            };
        }
    }

    async delete(query, condition, options = {}) {
        let result = await database.commandModel[this.entity].findOne({
            where: [condition, (!this.ignoreEntity()) ? {[Op.and]: this.generateLogicFilter(query)} : {}]
        });
        if (result) {
            let previousDataValues = {...result.dataValues};
            await result.destroy(options);
            return {
                dataValues: null,
                previousDataValues: previousDataValues
            };
        } else {
            return {
                dataValues: null,
                previousDataValues: null
            };
        }
    }

    async get(query, options) {
        let result;

        if (!this.ignoreEntity()) {
            options.where.push({[Op.and]: this.generateLogicFilter(query)}, {});
        }

        let cacheKey = generateUniqueKey(this.entity, options);

        switch ((query?.RequestType ?? '').toUpperCase()) {
            case 'ONE':
                result = await CacheMiddleware.cacheMiddleware(database.MemoryDatabase[this.entity.toUpperCase()], cacheKey, () => database.queryModel[this.entity].findOne(options));
                break;
            case 'ALL':
                result = await CacheMiddleware.cacheMiddleware(database.MemoryDatabase[this.entity.toUpperCase()], cacheKey, () => database.queryModel[this.entity].findAll(options));
                break;
            default:
                result = await CacheMiddleware.cacheMiddleware(database.MemoryDatabase[this.entity.toUpperCase()], cacheKey, () => database.queryModel[this.entity].findAndCountAll(options));
        }
        switch (query?.RequestType) {
            case 'ALL':
            case 'ONE':
                return {
                    data: result
                };
            default:
                return {
                    data: (result ?? {}).rows,
                    count: result.count
                };
        }
    }

    async getWithoutLimit(query, options) {
        let result;
        let cacheKey = generateUniqueKey(this.entity, options);

        switch ((query?.RequestType ?? '').toUpperCase()) {
            case 'ONE':
                result = await CacheMiddleware.cacheMiddleware(database.MemoryDatabase[this.entity.toUpperCase()], cacheKey, () => database.queryModel[this.entity].findOne(options));
                break;
            case 'ALL':
                result = await CacheMiddleware.cacheMiddleware(database.MemoryDatabase[this.entity.toUpperCase()], cacheKey, () => database.queryModel[this.entity].findAll(options));
                break;
            default:
                result = await CacheMiddleware.cacheMiddleware(database.MemoryDatabase[this.entity.toUpperCase()], cacheKey, () => database.queryModel[this.entity].findAndCountAll(options));
        }
        switch (query?.RequestType) {
            case 'ALL':
            case 'ONE':
                return {
                    data: result
                };
            default:
                return {
                    data: (result ?? {}).rows,
                    count: result.count
                };
        }
    }

    async makeTransaction() {
        return await database.commandSequelize.transaction();
    }

    escape(value) {
        return SqlString.escape(value);
    }
}

module.exports = BaseSequelizeRepository;