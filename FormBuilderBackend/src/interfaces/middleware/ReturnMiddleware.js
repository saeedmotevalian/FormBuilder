module.exports = new class ReturnMiddleware {

    return(data, req, res, next) {
        ReturnMiddleware.prototype.log(data, req);
        return res.status(200).json(data);
    }

    log(data, req) {
        const log = {
            indexName: process.env.APPLICATION_NAME,
            requestDetail: {
                originalUrl: req.originalUrl
            },
            userDetail: req.query.xuser,
            responseDetail: data
        };
        process.env.NODE_ENV === 'production' ? console.log(log) : false;
    }
};