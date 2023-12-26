class SessionDatabaseRepository {
    constructor() {
    }

    async get(id) {
        return JSON.parse(await database.sessionMemoryDatabase.get(id));
    }

    async createOrUpdate(id, data) {
        data = JSON.stringify(data);
        return await database.sessionMemoryDatabase.set(id, data, 'EX', process.env.SESSION_IN_MEMORY_DATABASE_AGE);
    }

    async delete(id) {
        return await database.sessionMemoryDatabase.del(id);
    }

    async deleteAll() {
        return await database.sessionMemoryDatabase.flushdb();
    }
}

module.exports = SessionDatabaseRepository;