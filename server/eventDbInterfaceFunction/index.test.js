const sinon = require('sinon');
const assert = require('assert');

const eventFunction = require('./index');
const { eventTypes, durations } = require('../shared/enums');

const handler = eventFunction.handler;

describe(__filename, () => {

    const testEvent = {
        action: 'add',
        type: eventTypes.LONG_CYCLE,
        duration: durations.TEN,
    };

    describe('when bad input is sent', () => {

        it('should error when event is missing', async () => {
            const event = null;

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if event is missing');
        });

        it('should error when database action is missing', async () => {
            const event = Object.assign({}, testEvent, { action: null });

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if database action is missing');
        });

        it('should error when database action is not recognized', async () => {
            const event = Object.assign({}, testEvent, { action: 'foo' });

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if database action is invalid');
        });

        it('should error when event type is missing', async () => {
            const event = Object.assign({}, testEvent, { type: null });

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if event type is missing');
        });

        it('should error when event type is not valid', async () => {
            const event = Object.assign({}, testEvent, { type: 'foo' });

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if event type is invalid');
        });

        it('should error when event duration is missing', async () => {
            const event = Object.assign({}, testEvent, { duration: null });

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if event duration is missing');
        });

        it('should error when event duration is not valid', async () => {
            const event = Object.assign({}, testEvent, { duration: 'foo' });

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if event duration is invalid');
        });
    });

    describe('when an event is added to database', () => {

        before(() => {

            sinon.stub(eventFunction, 'addToDb');
            sinon.stub(eventFunction, 'eventExists');
        });

        after(() => {

            eventFunction.addToDb.restore();
            eventFunction.eventExists.restore();
        });

        const addEvent = Object.assign({}, testEvent, { action: 'add' });

        describe('Positive Tests', () => {

            it('should add the event to database', async () => {

                eventFunction.addToDb.resolves('success');

                await handler(addEvent, {});
                assert.ok(true);
            });
        });

        describe('Negative Tests', () => {

            describe('when add calls fails', () => {
                
                before(() => {
                    
                    eventFunction.addToDb.rejects(new Error('database call failed'));
                });

                it('should error when trying to add', async () => {
    
                    try {
                        await handler(addEvent, {});
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if database call fails');
                });
            });

            describe('when call to check if event exists fails', () => {

                before(() => {

                    eventFunction.addToDb.resolves('success');
                    eventFunction.eventExists.rejects(new Error('could not reach database'));
                });
                
                it('should error when trying to delete', async () => {

                    try {
                        await handler(addEvent, {});
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if eventExists call fails');
                });
            });

            describe('when an event already exists', () => {

                before(() => {
                    
                    eventFunction.addToDb.resolves('success');
                });

                it('should error if event already exists in db', async () => {

                    eventFunction.eventExists.resolves(true);

                    try {
                        await handler(addEvent, {});
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if event already exists');
                });
            });
        });
    });

    describe('when an event is deleted from database', () => {

        before(() => {

            sinon.stub(eventFunction, 'deleteFromDb');
            sinon.stub(eventFunction, 'eventExists');
        });

        after(() => {

            eventFunction.deleteFromDb.restore();
            eventFunction.eventExists.restore();
        });

        const deleteEvent = Object.assign({}, testEvent, { action: 'delete' });

        describe('Positive Tests', () => {

            before(() => {

                eventFunction.deleteFromDb.resolves('success');
                eventFunction.eventExists.resolves(true);
            });

            it('should delete the event from database', async () => {

                await handler(deleteEvent, {});
                assert.ok(true);
            });
        });

        describe('Negative Tests', () => {

            describe('when a database call fails', () => {

                before(() => {
    
                    eventFunction.deleteFromDb.rejects(new Error('Could not delete'));
                    eventFunction.eventExists.resolves(true);
                });
         
                it('should error', async () => {

                    try {
                        await handler(deleteEvent, {});
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if call to delete fails');
                });       
            });

            describe('when call to check if event exists fails', () => {

                before(() => {

                    eventFunction.deleteFromDb.resolves('success');
                    eventFunction.eventExists.rejects(new Error('could not reach database'));
                });
                
                it('should error when trying to delete', async () => {

                    try {
                        await handler(deleteEvent, {});
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if eventExists call fails');
                });
            });

            describe('when requested resource does not exist', () => {

                before(() => {

                    eventFunction.deleteFromDb.resolves('success');
                    eventFunction.eventExists.resolves(false);
                });

                it('should error when trying to delete', async () => {

                    try {
                        await handler(deleteEvent, {});
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if event to delete does not exist');
                });
            });
        });
    });
});