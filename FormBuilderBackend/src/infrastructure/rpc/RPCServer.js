const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

class RPCServer {

    constructor() {
        this.server = null;
        this.handlers = {};
    }

    async handler(call, callback) {
        const request = call.request;
        const handler = this.handlers[request?.command];
        if (!handler) {
            return callback(new Error(`No handler registered for command: ${request?.command}`));
        }
        return callback(null, {
            responseData: {
                type_url: 'type.googleapis.com/service.Response',
                value: Buffer.from(JSON.stringify(await handler(JSON.parse(request.requestData?.value))))
            }
        });
    }

    registerHandler(commandName, handler) {
        this.handlers[commandName] = handler;
    }

    async connect() {
        this.server = new grpc.Server();
        const packageDefinition = protoLoader.loadSync('./service.proto', {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const service = protoDescriptor.service;
        this.server.addService(service.Service.service, {
            callCommand: async (call, callback) => {
                await this.handler(call, callback);
            }
        });
        this.server.bindAsync('0.0.0.0:' + process.env.RPC_PORT, grpc.ServerCredentials.createInsecure(), (error, port) => {
            console.log(`ServerRPC listening on port ${port}`);
            if (!error) {
                this.server.start();
            }
        });
    }
}

module.exports = RPCServer;