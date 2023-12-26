const BaseUseCase = require('./BaseUseCase');

class UsersUseCase extends BaseUseCase {

    constructor(usersRepository) {
        super();
        this.usersRepository = usersRepository;
    }

    async create(query, body) {
        try {
            let result = await this.usersRepository.create(query, body);
            return this.responseWithMessage(result, this.value.inserted, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async update(query, condition, body) {
        try {
            let result = await this.usersRepository.update(query, condition, body);
            return this.responseWithMessage(result, this.value.updated, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async delete(query, condition) {
        try {
            let result = await this.usersRepository.delete(query, condition);
            return this.responseWithMessage(result, this.value.deleted, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async get(query, body) {
        try {
            let result = await this.usersRepository.get(query, body);
            return this.responseWithMessage(result.data, this.value.prepared, true, result.count);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }
}

module.exports = UsersUseCase;