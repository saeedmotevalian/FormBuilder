class BaseResponse {

    responseWithMessage(data, message, isSuccess, count = null) {
        if (count !== null) {
            return {
                data: data,
                message: process.env.APPLICATION_NAME + '-' + message,
                success: isSuccess,
                count: count
            };
        } else {
            return {
                data: data,
                message: process.env.APPLICATION_NAME + '-' + message,
                success: isSuccess
            };
        }
    }

    responseWithTokenAndMessage(token, data, message, isSuccess, count = null) {
        if (count !== null) {
            return {
                token: token,
                message: process.env.APPLICATION_NAME + '-' + message,
                success: isSuccess,
                count: count
            };
        } else {
            return {
                token: token,
                message: process.env.APPLICATION_NAME + '-' + message,
                success: isSuccess
            };
        }
    }
}

module.exports = new BaseResponse();