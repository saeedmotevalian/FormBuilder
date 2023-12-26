const {
    responseWithMessage,
    responseWithTokenAndMessage
} = require('./../../shared/response/BaseResponse');
const {response} = require('./../../shared/response/ExceptionHandler');
const value = require('./../../shared/value/value');
const DBOperation = require('./../../shared/enums/DBOperation');

class BaseUseCase {

    constructor() {
        this.value = value;
        this.DBOperation = DBOperation;
    }

    responseWithMessage(data, message, isSuccess, count = null) {
        return responseWithMessage(data, message, isSuccess, count);
    }

    responseWithTokenAndMessage(token, data, message, isSuccess, count = null) {
        return responseWithTokenAndMessage(token, data, message, isSuccess, count);
    }

    response(error) {
        return response(error);
    }

    addToRequestBody(body, value) {
        if (!body.Filter) {
            body.Filter = {};
        }
        if (!body.Filter.Values) {
            body.Filter.Values = [];
        }
        let index = body.Filter.Values.findIndex(temp => temp.Field === value.Field);
        if (index !== -1) {
            body.Filter.Values.splice(index, 1);
        }
        body.Filter.Values.push(value);
    }
}

module.exports = BaseUseCase;