const BaseUseCase = require('./BaseUseCase');

class UserFormsUseCase extends BaseUseCase {

    constructor(userFormsRepository) {
        super();
        this.userFormsRepository = userFormsRepository;
    }

    async create(query, body) {
        try {
            let result = await this.userFormsRepository.create(query, body);
            return this.responseWithMessage(result, this.value.inserted, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async update(query, condition, body) {
        try {
            let result = await this.userFormsRepository.update(query, condition, body);
            return this.responseWithMessage(result, this.value.updated, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async delete(query, condition) {
        try {
            let result = await this.userFormsRepository.delete(query, condition);
            return this.responseWithMessage(result, this.value.deleted, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async get(query, body) {
        try {
            let result = await this.userFormsRepository.get(query, body);
            return this.responseWithMessage(result.data, this.value.prepared, true, result.count);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }
}

module.exports = UserFormsUseCase;