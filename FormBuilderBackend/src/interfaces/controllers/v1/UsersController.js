const BaseController = require('./BaseController');

class UsersController extends BaseController {

    constructor(useCase) {
        super(useCase);
    }

    async create(req, res, next) {
        const data = req.body;
        const result = await this.useCase.create(req.query, data);
        return next(result);
    }

    async get(req, res, next) {
        const result = await this.useCase.get(req.query, req.body);
        return next(result);
    }

    async update(req, res, next) {
        const condition = req.params;
        const data = req.body;
        const result = await this.useCase.update(req.query, condition, data);
        return next(result);
    }

    async delete(req, res, next) {
        const condition = req.params;
        const result = await this.useCase.delete(req.query, condition);
        return next(result);
    }
}

module.exports = UsersController;