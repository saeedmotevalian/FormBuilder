const jsonwebtoken = require('jsonwebtoken');

function verifyAndDecodeToken(token) {
    return jsonwebtoken.decode(token);
}

function sign(data, secret, options) {
    return jsonwebtoken.sign(data, secret, options);
}

module.exports = {
    verifyAndDecodeToken,
    sign
};