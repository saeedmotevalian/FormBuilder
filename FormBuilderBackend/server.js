const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./src/infrastructure/database/Database');
const SessionDatabaseRepository = require('./src/infrastructure/database/repositories/SessionDatabaseRepository');
const MessageBroker = require('./src/infrastructure/messageBroker/MessageBroker');
const ExternalService = require('./src/infrastructure/services/ExternalService');
const DiscoveryService = require('./src/infrastructure/discovery/DiscoveryService');
const RoutingService = require('./src/infrastructure/services/RoutingService');
const RPCServer = require('./src/infrastructure/rpc/RPCServer');
const RPCClient = require('./src/infrastructure/rpc/RPCClient');
const Tracing = require('./src/infrastructure/tracing/Tracing');
const microservice = require('./src/shared/value/microservice');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Create the Express app
const app = express();

// Create the tracing instance
global.tracing = new Tracing(app);
tracing.requestHandler();

global.microservice = microservice;

// Create the database instance
global.database = new Database();

global.sessionDatabase = new SessionDatabaseRepository();

// Create the externalService instance
global.externalService = new ExternalService();

// Create the discovery instance
global.discovery = new DiscoveryService();
discovery.register(process.env.APPLICATION_NAME, process.env.PORT, process.env.RPC_PORT);

// Create the rpc server instance
global.rpcServer = new RPCServer();
rpcServer.connect();

// Create the rpc client instance
global.rpcClient = new RPCClient();
rpcClient.connect();

// Create the routing instance
global.routing = new RoutingService();

// Create the message broker instance
global.messageBroker = new MessageBroker();
messageBroker.connect().then(() => {
    // Routes
    const apiRouter = require('./src/interfaces/routes');
    app.use('/api', apiRouter);
    tracing.errorHandler();

    // Start the server
    const PORT = process.env.PORT || 0;

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});

app.all('/ready-health', (req, res) => {
    res.status(200).json(true);
});

app.all('/live-health', (req, res) => {
    res.status(200).json(true);
});
app.use(helmet({
    contentSecurityPolicy: false
}));
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(cors());
app.use(bodyParser.json());
// Middleware
app.use((req, res, next) => {
    let offset = parseInt(req.query.offset, 10) || 0;
    let limit = parseInt(req.query.limit, 10) || 10;

    offset = Math.max(0, offset);
    limit = Math.max(1, Math.min(20, limit));

    req.query.pagination = {
        offset: offset * limit,
        limit: (offset * limit) + limit
    };
    next();
});
