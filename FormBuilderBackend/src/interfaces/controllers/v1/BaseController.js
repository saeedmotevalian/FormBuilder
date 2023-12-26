const value = require('./../../../shared/value/value');

class BaseController {

    constructor(useCase) {
        this.useCase = useCase;
        this.value = value;
    }
}

module.exports = BaseController;