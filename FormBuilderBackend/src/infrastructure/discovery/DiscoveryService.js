const Eureka = require('eureka-js-client').Eureka;
const os = require('os');
const {Op} = require("sequelize");

class DiscoveryService {

    constructor() {
        this.eureka = null;
        this.eurekaRPC = null;
        this.instanceIndex = 0;
        this.instances = [];
    }

    async register(applicationName, port, rpcPort) {
        this.eureka = new Eureka({
            eureka: {
                host: process.env.DISCOVERY_HOST,
                port: process.env.DISCOVERY_PORT,
                servicePath: '/eureka/apps',
                maxRetries: 10,
                requestRetryDelay: 2000,
            },
            instance: {
                app: applicationName,
                hostName: applicationName,
                ipAddr: os.hostname(),
                port: {
                    '$': port,
                    '@enabled': 'true',
                },
                vipAddress: applicationName,
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                }
            }
        });

        this.eureka.start();

        this.eurekaRPC = new Eureka({
            eureka: {
                host: process.env.DISCOVERY_HOST,
                port: process.env.DISCOVERY_PORT,
                servicePath: '/eureka/apps',
                maxRetries: 10,
                requestRetryDelay: 2000,
            },
            instance: {
                app: 'rpc-' + applicationName,
                hostName: 'rpc-' + applicationName,
                ipAddr: os.hostname(),
                port: {
                    '$': rpcPort,
                    '@enabled': 'true',
                },
                vipAddress: 'rpc-' + applicationName,
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                }
            }
        });

        this.eurekaRPC.start();

        process.on('SIGINT', this.exitHandler.bind(this, {exit: true}));

        this.eureka.on('deregistered', () => {
            if (this.eureka.registryFetch._destroyed && this.eurekaRPC.registryFetch._destroyed) {
                process.exit();
            }
        });
        this.eurekaRPC.on('deregistered', () => {
            if (this.eureka.registryFetch._destroyed && this.eurekaRPC.registryFetch._destroyed) {
                process.exit();
            }
        });
    }

    exitHandler(options, exitCode) {
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            this.deregister();
        }
    }

    getNextServiceInstance(microservice) {
        this.instances = this.eurekaRPC.getInstancesByAppId(microservice);

        if (this.instances.length > 0) {
            const instance = this.instances[this.instanceIndex];
            this.instanceIndex = (this.instanceIndex + 1) % this.instances.length;
            return instance;
        }

        return null;
    }

    deregister() {
        if (this.eureka && this.eureka) {
            this.eurekaRPC.stop();
            this.eureka.stop();
        }
    }
}

module.exports = DiscoveryService;