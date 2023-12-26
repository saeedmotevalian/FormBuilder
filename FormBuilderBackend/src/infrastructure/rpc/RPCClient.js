const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

class RPCClient {

    constructor() {
        this.service = null;
    }

    connect() {
        const packageDefinition = protoLoader.loadSync('./service.proto', {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        this.service = protoDescriptor.service;
    }

    async callService(microservice, command, data) {
        return new Promise((resolve) => {
            const instance = discovery.getNextServiceInstance('rpc-' + microservice);
            if (instance) {
                let client = new this.service.Service(`${instance.hostName}:${instance.port?.$}`, grpc.credentials.createInsecure());
                client.callCommand({
                    command: command,
                    requestData: {
                        type_url: 'type.googleapis.com/service.Request',
                        value: Buffer.from(JSON.stringify(data))
                    }
                }, (error, response) => {
                    if (response) {
                        return resolve({
                            response: JSON.parse(Buffer.from(response.responseData?.value))
                        });
                    } else {
                        throw resolve(error);
                    }
                });
            } else {
                throw resolve(new Error("Microservice not found"));
            }
        });
    }
}

module.exports = RPCClient;