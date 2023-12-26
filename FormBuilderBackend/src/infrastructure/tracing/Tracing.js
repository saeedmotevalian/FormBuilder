const Sentry = require('@sentry/node');

class Tracing {

    constructor(app) {
        Sentry.init({dsn: process.env.TRACING_URL});
        this.app = app;
    }

    requestHandler() {
        this.app.use(Sentry.Handlers.requestHandler());
    }

    errorHandler() {
        this.app.use(Sentry.Handlers.errorHandler());
    }

    error(error) {
        Sentry.captureException(error);
    }
}

module.exports = Tracing;