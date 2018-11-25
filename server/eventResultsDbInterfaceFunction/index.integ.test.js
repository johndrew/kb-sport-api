const assert = require('assert');
const { handler } = require('./index');

describe(__filename, () => {

    it.skip('should register a lifter', async () => {
        
        await handler({
            action: 'register',
            eventId: '18c88ea8b8a5dd866e94e5ff248d5ce9c4b9181c',
            lifterId: '0eb62bb5d2ff8be63997e24a5dd85516c5980c6e',
        }, { tableName: 'kbEventDetailsDb-dev' });
    });
});