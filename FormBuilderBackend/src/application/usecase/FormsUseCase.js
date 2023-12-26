const BaseUseCase = require('./BaseUseCase');

class FormsUseCase extends BaseUseCase {

    constructor(formsRepository) {
        super();
        this.formsRepository = formsRepository;
    }

    async create(query, body) {
        try {
            let result = await this.formsRepository.create(query, body);
            return this.responseWithMessage(result, this.value.inserted, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async update(query, condition, body) {
        try {
            let result = await this.formsRepository.update(query, condition, body);
            return this.responseWithMessage(result, this.value.updated, true);
        } catch (error) {
            console.log(error);
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async delete(query, condition) {
        try {
            let result = await this.formsRepository.delete(query, condition);
            return this.responseWithMessage(result, this.value.deleted, true);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async get(query, body) {
        try {
            let result = await this.formsRepository.get(query, body);
            return this.responseWithMessage(result.data, this.value.prepared, true, result.count);
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }
}

module.exports = FormsUseCase;