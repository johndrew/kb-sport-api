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
    const context = {
        tableName: 'kbEventDb-dev',
    };

    describe('when bad input is sent', () => {

        it('should error when event is missing', async () => {
            const event = null;

            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if event is missing');
        });

        it('should error when database action is missing', async () => {
            const event = Object.assign({}, testEvent, { action: null });

            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if database action is missing');
        });

        it('should error when database action is not recognized', async () => {
            const event = Object.assign({}, testEvent, { action: 'foo' });

            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(true);
                return;
            }

            throw new Error('should not resolve if database action is invalid');
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

                await handler(addEvent, context);
                assert.ok(true);
            });
        });

        describe('Negative Tests', () => {

            describe('when bad input is sent', () => {

                it('should error when event type is missing', async () => {
                    const event = Object.assign({}, addEvent, { type: null });

                    try {
                        await handler(event, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if event type is missing');
                });

                it('should error when event type is not valid', async () => {
                    const event = Object.assign({}, addEvent, { type: 'foo' });

                    try {
                        await handler(event, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if event type is invalid');
                });

                it('should error when event duration is missing', async () => {
                    const event = Object.assign({}, addEvent, { duration: null });

                    try {
                        await handler(event, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if event duration is missing');
                });

                it('should error when event duration is not valid', async () => {
                    const event = Object.assign({}, addEvent, { duration: 'foo' });

                    try {
                        await handler(event, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if event duration is invalid');
                });
            });

            describe('when add calls fails', () => {

                before(() => {

                    eventFunction.addToDb.rejects(new Error('database call failed'));
                });

                it('should error when trying to add', async () => {

                    try {
                        await handler(addEvent, context);
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
                        await handler(addEvent, context);
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
                        await handler(addEvent, context);
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

        const deleteEvent = { action: 'delete', eventId: 'foo' };

        describe('Positive Tests', () => {

            before(() => {

                eventFunction.deleteFromDb.resolves('success');
                eventFunction.eventExists.resolves(true);
            });

            it('should delete the event from database', async () => {

                await handler(deleteEvent, context);
                assert.ok(true);
            });
        });

        describe('Negative Tests', () => {

            describe('when bad input is sent', () => {
                
                it('should error when eventId is missing', async () => {
                    
                    const event = Object.assign({}, deleteEvent, { eventId: null });

                    try {
                        await handler(event, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if eventId is missing');
                });
            });

            describe('when a database call fails', () => {

                before(() => {

                    eventFunction.deleteFromDb.rejects(new Error('Could not delete'));
                    eventFunction.eventExists.resolves(true);
                });

                it('should error', async () => {

                    try {
                        await handler(deleteEvent, context);
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
                        await handler(deleteEvent, context);
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
                        await handler(deleteEvent, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }

                    throw new Error('should not resolve if event to delete does not exist');
                });
            });
        });
    });

    describe('when all events are requested', () => {

        before(() => {

            sinon.stub(eventFunction, 'getAllFromDb');
        });

        after(() => {

            eventFunction.getAllFromDb.restore();
        });

        const getEvent = { action: 'getAll' };

        describe('Positive Tests', () => {

            before(() => {

                eventFunction.getAllFromDb.returns([]);
            });

            it('should return all events', async () => {

                await handler(getEvent, context);
                assert.ok(true);
            });
        });

        describe('Negative Tests', () => {

            before(() => {

                eventFunction.getAllFromDb.rejects(new Error('Could not get all'));
            });

            it('should error when database call fails', async () => {

                try {
                    await handler(getEvent, context);
                } catch (e) {
                    assert.ok(true);
                    return;
                }

                throw new Error('should not resolve if database call fails');
            });
        });
    });

    describe('when a lifter is registered to an event', () => {

        const registerEvent = {
            action: 'register',
            eventId: 'bar',
            lifterId: 'foo',
        };

        before(() => {
            
            sinon.stub(eventFunction, 'eventExists');
            sinon.stub(eventFunction, 'lifterExists');
            sinon.stub(eventFunction, 'registerLifterInDb');
        });

        after(() => {
            
            eventFunction.eventExists.restore();
            eventFunction.lifterExists.restore();
            eventFunction.registerLifterInDb.restore();
        });
        
        describe('Positive Tests', () => {

            before(() => {
                
                eventFunction.eventExists.resolves(true);
                eventFunction.lifterExists.resolves(true);
                eventFunction.registerLifterInDb.resolves('success');
            });

            it('should resolve if update is successful', async () => {
                
                await handler(registerEvent, context);
                assert.ok(true);
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if eventId is missing', async () => {

                const event = Object.assign({}, registerEvent, { eventId: undefined });

                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(true);
                    return;
                }

                throw new Error('should not resolve if lifter id is missing');
            });

            it('should error if lifterId is missing', async () => {

                const event = Object.assign({}, registerEvent, { lifterId: undefined });

                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(true);
                    return;
                }

                throw new Error('should not resolve if lifter id is missing');
            });

            describe('when event does not exist', () => {

                before(() => {
                    
                    eventFunction.eventExists.rejects(new Error('event does not exist'));
                    eventFunction.lifterExists.resolves(true);
                    eventFunction.registerLifterInDb.resolves('success');
                });
                
                it('should error when event does not exist', async () => {
    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if event does not exist');
                });
            });

            describe('when call to check if lifter exists fails', () => {
                
                before(() => {
                    
                    eventFunction.eventExists.resolves(true);
                    eventFunction.lifterExists.rejects(new Error('call failed'));
                    eventFunction.registerLifterInDb.resolves('success');
                });
                
                it('should error when lifter existence cannot be determined', async () => {
    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if lifter existence cannot be determined');
                });
            });

            describe('when lifter does not exist', () => {
                
                before(() => {
                    
                    eventFunction.eventExists.resolves(true);
                    eventFunction.lifterExists.resolves(false);
                    eventFunction.registerLifterInDb.resolves('success');
                });
                
                it('should error when lifter does not exist', async () => {
    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(true);
                        return;
                    }
    
                    throw new Error('should not resolve if lifter does not exist');
                });
            });

            describe('when call to register fails', () => {

                before(() => {
    
                    eventFunction.eventExists.resolves(true);
                    eventFunction.lifterExists.resolves(true);
                    eventFunction.registerLifterInDb.rejects(new Error('Could not register lifter'));
                });

                it('should error when call to register fails', async () => {
                    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if register call fails');
                });
            });
        });
    });

    describe('when checking if an event exists', () => {

        const existsEvent = {
            action: 'exists',
            eventId: 'foo',
        };

        before(() => {
            
            sinon.stub(eventFunction, 'eventExists');
        });

        after(() => {
            
            eventFunction.eventExists.restore();
        });
        
        describe('Positive Tests', () => {
                
            before(() => {
                
                eventFunction.eventExists.resolves(true);
            });

            it('should return true if event exists', async () => {
                
                const actual = await handler(existsEvent, context);
                assert.strictEqual(actual, true);
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if eventId is missing', async () => {

                const event = Object.assign({}, existsEvent, { eventId: null });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if eventId is missing');
            });

            describe('when network error occurs', () => {
                
                before(() => {
                    
                    eventFunction.eventExists.rejects(new Error('call failed'));
                });

                it('should error when existence call fails', async () => {
                    
                    try {
                        await handler(existsEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if network call fails');
                });
            });

            describe('when event does not exist', () => {
                
                before(() => {
                    
                    eventFunction.eventExists.resolves(false);
                });
    
                it('should return false if event does not exists', async () => {
                    
                    const actual = await handler(existsEvent, context);
                    assert.strictEqual(actual, false);
                });
            });
        });
    });
});