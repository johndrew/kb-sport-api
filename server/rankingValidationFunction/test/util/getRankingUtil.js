const request = require('request-promise');
const { handler } = require('../../../getRankingFunction/index');

const getRequestOptions = (params) => {
    return {
        uri: 'https://03zvdlhqz0.execute-api.us-west-2.amazonaws.com/dev/getRanking',
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        },
    }
};

const getRanking = async (params) => {
    const options = getRequestOptions(params);

    return request(options)
        .then(result => JSON.parse(result))
        .then(({ ranking }) => ranking);
};

const testErrorCode = async (params, statusCode) => {
    const options = Object.assign({}, getRequestOptions(params), {
        resolveWithFullResponse: true,
    });

    let passes = false;
    try {
        await request(options);
    } catch (e) {
        passes = e.statusCode && e.statusCode === statusCode;
    }

    return passes;
};

const getRankingLocal = async (params) => {
    return handler(params);
}

const testError = async (params, statusCode) => {
    try {
        await getRankingLocal(params);
    } catch (e) {
        if (e.message.indexOf('No ranking found') > -1) {
            return 404 === statusCode;
        } else if (
            e.message.indexOf('Could not get ranking') > -1 ||
            e.message.indexOf('Could not extract ranking') > -1 ||
            e.message.indexOf('Input is not valid') > -1
        ) {
            return 400 === statusCode;
        } else {
            return false;
        }
    }
}

module.exports = {
    getRanking,
    getRankingLocal,
    testErrorCode,
    testError,
}