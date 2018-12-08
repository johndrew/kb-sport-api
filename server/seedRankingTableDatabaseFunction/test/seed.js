const { handler } = require('../index');

describe('Seed DB', () => {
    
    it('seed', async function () {
        
        this.timeout(10000);

        await handler();
    });
});