const {nanoid} = require('nanoid');

function getRandomUID(length = 36) {
    return nanoid(length);
}

module.exports = {getRandomUID};