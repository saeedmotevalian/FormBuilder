const Redis = require("ioredis");
const initModels = require('./../../domain/models/init-models');
const DBOperation = require('./../../shared/enums/DBOperation');
const MemoryDatabase = require('../../shared/enums/MemoryDatabase');
const {
    Sequelize,
    Op
} = require("sequelize");

class Database {
    constructor() {
        this.commandSequelize = this.createSequelize(
            process.env.COMMAND_DATABASE_NAME,
            process.env.COMMAND_DATABASE_USERNAME,
            process.env.COMMAND_DATABASE_PASSWORD,
            process.env.COMMAND_DATABASE_HOST,
            process.env.COMMAND_DIAlECT
        );
        this.commandModel = initModels(this.commandSequelize);

        this.querySequelize = this.createSequelize(
            process.env.QUERY_DATABASE_NAME,
            process.env.QUERY_DATABASE_USERNAME,
            process.env.QUERY_DATABASE_PASSWORD,
            process.env.QUERY_DATABASE_HOST,
            process.env.QUERY_DIAlECT
        );
        this.queryModel = initModels(this.querySequelize);

        this.DBOperation = DBOperation;

        this.MemoryDatabase = MemoryDatabase;

        this.sessionMemoryDatabase = this.createMemoryDb(process.env.SESSION_IN_MEMORY_DATABASE_PORT, process.env.SESSION_IN_MEMORY_DATABASE_HOST, process.env.SESSION_IN_MEMORY_DATABASE_USERNAME, process.env.SESSION_IN_MEMORY_DATABASE_PASSWORD, MemoryDatabase.SESSION);

        this.dataMemoryDatabase = {};
        const enumValues = Object.values(MemoryDatabase);
        for (const value of enumValues) {
            this.dataMemoryDatabase[value] = this.createMemoryDb(process.env.DATA_IN_MEMORY_DATABASE_PORT, process.env.DATA_IN_MEMORY_DATABASE_HOST, process.env.DATA_IN_MEMORY_DATABASE_USERNAME, process.env.DATA_IN_MEMORY_DATABASE_PASSWORD, value);
        }
    }

    createSequelize(databaseName, username, password, host, dialect) {
        return new Sequelize(databaseName, username, password, {
            host,
            dialect,
            logging: process.env.NODE_ENV === 'production' ? false : console.log
        });
    }

    createMemoryDb(port, host, username, password, db) {
        return new Redis({
            port: port,
            host: host,
            username: username,
            password: password,
            db: db
        });
    }

    compareType(value) {
        if (value.Type === DBOperation.LIKE) {
            return Op.like;
        } else if (value.Type === DBOperation.GTE) {
            return Op.gte;
        } else if (value.Type === DBOperation.LTE) {
            return Op.lte;
        } else if (value.Type === DBOperation.GT) {
            return Op.gt;
        } else if (value.Type === DBOperation.LT) {
            return Op.lt;
        } else if (value.Type === DBOperation.IS) {
            return Op.is;
        } else if (value.Type === DBOperation.IN) {
            return Op.in;
        } else if (value.Type === DBOperation.NOTIN) {
            return Op.notIn;
        } else if (value.Type === DBOperation.NE) {
            return Op.ne;
        } else if (value.Type === DBOperation.OVERLAP) {
            return Op.overlap;
        } else if (value.Type === DBOperation.CONTAINS) {
            return Op.contains;
        } else {
            return Op.eq;
        }
    }
}

module.exports = Database;