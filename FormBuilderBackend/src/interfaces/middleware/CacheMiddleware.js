module.exports = new class CacheMiddleware {
    async cacheMiddleware(db, key, queryFn) {
        let ignoreEntity = [database.MemoryDatabase['FACTORS']];

        try {
            if (ignoreEntity.includes(db)) {
                return await queryFn();
            } else {
                const cachedData = await database.dataMemoryDatabase[db].get(key);
                if (cachedData) {
                    return JSON.parse(cachedData);
                } else {
                    const data = await queryFn();
                    await database.dataMemoryDatabase[db].setex(key, process.env.DATA_IN_MEMORY_DATABASE_AGE, JSON.stringify(data));
                    return data;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteAll(db) {
        try {
            await database.dataMemoryDatabase[db].flushdb();
        } catch (error) {
            throw error;
        }
    }
};