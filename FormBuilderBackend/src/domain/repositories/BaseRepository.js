class BaseRepository {

    async create(query, body) {
        throw new Error("Method not implemented");
    }

    async update(query, condition, body) {
        throw new Error("Method not implemented");
    }

    async delete(query, condition) {
        throw new Error("Method not implemented");
    }

    async get(query, body) {
        throw new Error("Method not implemented");
    }
}

module.exports = BaseRepository;