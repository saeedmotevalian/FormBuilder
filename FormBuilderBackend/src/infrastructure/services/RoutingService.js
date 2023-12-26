const value = require("../../shared/value/value");
const axios = require("axios");

class RoutingService {
    async request(microservice, command, body) {
        let {
            response
        } = await rpcClient.callService(microservice, command, body);
        if (response.message.endsWith(value.error)) {
            throw new Error('Internal server error.');
        }
        return response;
    }

    async tcpRequest(method, url, params, body, headers) {
        try {
            const response = await axios({
                method: method,
                url: `${url}`,
                params: params,
                data: body,
                headers: headers
            });
            return response.data;
        } catch (error) {
            throw new Error("Microservice not called");
        }
    }
}

module.exports = RoutingService;