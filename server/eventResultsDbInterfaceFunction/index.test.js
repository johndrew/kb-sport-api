const assert = require('assert');
const eventResultsFunction = require('./index');

const { handler } = eventResultsFunction;

describe(__filename, () => {

    const eventTemplate = {
        action: 'register',
    };
    const context = {};

    describe('when bad input is provided', () => {
        
        it('should error if event is missing', async () => {
            
            try {
                await handler(null, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if event is missing');
        });

        it('should error if action is missing', async () => {

            const event = Object.assign({}, eventTemplate, { action: undefined });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if action is missing');
        });

        it('should error if action is invalid', async () => {

            const event = Object.assign({}, eventTemplate, { action: 'foo' });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if action is missing');
        });
    });
});