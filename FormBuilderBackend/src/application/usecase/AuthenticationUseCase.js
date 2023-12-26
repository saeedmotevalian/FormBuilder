const BaseUseCase = require('./BaseUseCase');
const {sign} = require('./../../infrastructure/util/JWT');
const crypto = require('crypto');

class AuthenticationUseCase extends BaseUseCase {

    constructor(authenticationRepository, usersRepository) {
        super();
        this.authenticationRepository = authenticationRepository;
        this.usersRepository = usersRepository;
    }

    async login(query) {
        try {
            const {
                username,
                password
            } = query;

            const user = await this.getUser(username);
            if (!user) {
                return this.responseWithMessage(null, this.value.authenticationFailed, false);
            } else {
                const success = await this.checkUsernameAndPassword(user, password);
                if (success) {
                    return this.responseWithTokenAndMessage(this.createAuthenticatedToken(user.UserId), null, this.value.prepared, true);
                } else {
                    return this.responseWithMessage(null, this.value.authenticationFailed, false);
                }
            }
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async register(body) {
        try {
            const {
                UserName,
                Password
            } = body;

            const user = await this.getUser(UserName);
            if (user) {
                return this.responseWithMessage(null, this.value.authenticationFailed, false);
            } else {
                let salt = 'eaea6507a3';
                let encryptionKey = this.hexToByte('6FA5B7DB89076816248243B8FD7336CCA360DAF8');
                const hashedPassword = this.hashPasswordWithSaltAndKey(Password, salt, encryptionKey);
                let user = await this.usersRepository.createWithoutLimit({
                    UserName: UserName,
                    Password: hashedPassword,
                    PasswordSalt: salt
                }, {returning: true});
                if (user?.dataValues) {
                    return this.responseWithTokenAndMessage(this.createAuthenticatedToken(user.dataValues.UserId), null, this.value.prepared, true);
                } else {
                    return this.responseWithMessage(null, this.value.authenticationFailed, false);
                }
            }
        } catch (error) {
            return this.responseWithMessage(this.response(error), this.value.error, false);
        }
    }

    async getUser(username) {
        let result = await this.authenticationRepository.getUser(username);
        return result.data;
    }

    createAuthenticatedToken(userId) {
        let token = sign({
            UserId: userId
        }, 'secret', {expiresIn: '24h'});
        return token;
    }

    hashPasswordWithSaltAndKey(password, salt, key) {
        const saltedPassword = password + salt;
        const hmac = crypto.createHmac('sha1', key);
        hmac.update(Buffer.from(saltedPassword, 'utf16le'));
        return hmac.digest('base64');
    }

    hexToByte(hexString) {
        const byteLength = hexString.length / 2;
        const returnBytes = new Uint8Array(byteLength);

        for (let i = 0; i < byteLength; i++) {
            returnBytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
        }

        return returnBytes;
    }

    async checkUsernameAndPassword(user, password) {
        let salt = user.PasswordSalt;
        let encryptionKey = this.hexToByte('6FA5B7DB89076816248243B8FD7336CCA360DAF8');
        const hashedPassword = this.hashPasswordWithSaltAndKey(password, salt, encryptionKey);
        if (hashedPassword === user.Password) {
            return true;
        }
    }
}

module.exports = AuthenticationUseCase;