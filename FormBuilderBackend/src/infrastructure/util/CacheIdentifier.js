const crypto = require("crypto");

function generateUniqueKey(endpoint, options) {
    function convertSymbolsToKeys(object) {
        if (typeof object !== 'object' || object === null) {
            return object;
        }
        if (Array.isArray(object)) {
            return object.map(convertSymbolsToKeys);
        }
        const newObject = {};
        for (const key in object) {
            newObject[key] = convertSymbolsToKeys(object[key]);
        }
        Object.getOwnPropertySymbols(object).forEach((symbolKey) => {
            const newKey = symbolKey.toString();
            newObject[newKey] = convertSymbolsToKeys(object[symbolKey]);
        });
        return newObject;
    }

    return crypto.createHash('md5').update(JSON.stringify({
        endpoint: endpoint,
        options: convertSymbolsToKeys(options)
    })).digest('hex');
}

module.exports = {
    generateUniqueKey
};