const BaseController = require('./BaseController');

class AuthenticationController extends BaseController {

    constructor(useCase) {
        super(useCase);
    }

    async login(req, res, next) {
        const result = await this.useCase.login(req.query);
        return next(result);
    }

    async register(req, res, next) {
        const result = await this.useCase.register(req.body);
        return next(result);
    }
}

module.exports = AuthenticationController;