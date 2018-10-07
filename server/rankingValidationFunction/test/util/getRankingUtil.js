const request = require('request-promise');

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

module.exports = {
    getRanking,
    testErrorCode,
}