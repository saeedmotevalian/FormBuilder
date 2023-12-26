const BaseSequelizeRepository = require('./BaseSequelizeRepository');

class SequelizeCacheMemoryRepository extends BaseSequelizeRepository {

    constructor() {
        super();
    }

    async delete(entity) {
        await super.deleteCacheDatabase(entity);
    }
}

module.exports = SequelizeCacheMemoryRepository;