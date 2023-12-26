const {responseWithMessage} = require('./../../shared/response/BaseResponse');
const {response} = require('./../../shared/response/ExceptionHandler');
const {verifyAndDecodeToken} = require('./../../infrastructure/util/JWT');
const value = require('./../../shared/value/value');
const UserType = require('./../../shared/enums/UserType');

module.exports = new class AuthenticationMiddleware {

    async uaa(req, res, next) {
        try {
            const bearerHeader = req.headers['authorization'];
            if (bearerHeader && bearerHeader.split(' ').length > 0) {
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];

                const decodedToken = await verifyAndDecodeToken(bearerToken);
                if (decodedToken && decodedToken.UserId) {
                    let xuser = await sessionDatabase.get(decodedToken.UserId);
                    if (xuser) {
                        req.query.xuser = xuser;
                    } else {
                        xuser = {
                            UserId: decodedToken.UserId,
                            Ip: req.headers['x-real-ip']
                        };
                        await sessionDatabase.createOrUpdate(decodedToken.UserId, xuser);
                    }
                    req.query.xuser = xuser;
                    return next();
                } else {
                    AuthenticationMiddleware.prototype.log(req);
                    return res.status(200).json(responseWithMessage(null, value.unauthorized, false));
                }
            } else {
                AuthenticationMiddleware.prototype.log(req);
                return res.status(200).json(responseWithMessage(null, value.tokenNotFound, false));
            }
        } catch (error) {
            AuthenticationMiddleware.prototype.log(req);
            return res.status(200).json(responseWithMessage(response(error), value.error, false));
        }
    }

    log(req) {
        const log = {
            indexName: process.env.APPLICATION_NAME,
            bodyContent: {
                reqIp: req.headers['x-real-ip'] || req.ip,
                originalUrl: req.originalUrl,
                method: req.method,
                params: req.params,
                query: req.query
            }
        };
    }
};
