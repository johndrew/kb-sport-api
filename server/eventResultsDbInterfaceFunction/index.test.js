const assert = require('assert');
const sinon = require('sinon');
const eventResultsFunction = require('./index');
const {
    eventTypes,
    durations,
    genders,
    rankings,
    weightClasses,
} = require('../shared/enums');

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

    describe('when registering a lifter', () => {

        const registerEvent = Object.assign({}, eventTemplate, {
            eventId: 'foo',
            lifterId: 'bar',
        });

        beforeEach(() => {
            
            sinon.stub(eventResultsFunction, 'eventExists');
            sinon.stub(eventResultsFunction, 'lifterExists');
            sinon.stub(eventResultsFunction, 'registerLifter');
            eventResultsFunction.lifterExists.resolves(true);
            eventResultsFunction.eventExists.resolves(true);
            eventResultsFunction.registerLifter.resolves('success');
        });

        afterEach(() => {
            
            eventResultsFunction.eventExists.restore();
            eventResultsFunction.lifterExists.restore();
            eventResultsFunction.registerLifter.restore();
        });
        
        describe('Positive Tests', () => {

            it('should resolve', async () => {
                
                await handler(registerEvent, context);
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if event id is missing', async () => {
                
                const event = Object.assign({}, registerEvent, { eventId: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if event id is missing');
            });

            it('should error if lifter id is missing', async () => {
                
                const event = Object.assign({}, registerEvent, { lifterId: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if lifter id is missing');
            });

            describe('when event existence cannot be determined', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.eventExists.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if event existence cannot be determined');
                });
            });

            describe('when event does not exist', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(false);
                });

                afterEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if event does not exist');
                });
            });

            describe('when lifter existence cannot be determined', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.lifterExists.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter existence cannot be determined');
                });
            });

            describe('when the lifter does not exist', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(false);
                });

                afterEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter does not exist');
                });
            });

            describe('when register call fails', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.registerLifter.rejects(new Error('could not register lifter'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.registerLifter.resolves('success');
                });

                it('should error', async () => {
                    
                    try {
                        await handler(registerEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if register call fails');
                })
            });
        });
    });

    describe('when unregistering a lifter', () => {
        
        const unregisterEvent = Object.assign({}, eventTemplate, {
            action: 'unregister',
            eventId: 'foo',
            lifterId: 'bar',
        });

        beforeEach(() => {
            
            sinon.stub(eventResultsFunction, 'eventExists');
            sinon.stub(eventResultsFunction, 'lifterExists');
            sinon.stub(eventResultsFunction, 'unregisterLifter');
            eventResultsFunction.eventExists.resolves(true);
            eventResultsFunction.lifterExists.resolves(true);
            eventResultsFunction.unregisterLifter.resolves('success');
        });

        afterEach(() => {
            
            eventResultsFunction.eventExists.restore();
            eventResultsFunction.lifterExists.restore();
            eventResultsFunction.unregisterLifter.restore();
        });

        describe('Positive Tests', () => {

            it('should resolve', async () => {
                
                await handler(unregisterEvent, context);
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if event id is missing', async () => {
                
                const event = Object.assign({}, unregisterEvent, { eventId: undefined });

                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if event id is missing');
            });

            it('should error if lifter id is missing', async () => {
                
                const event = Object.assign({}, unregisterEvent, { lifterId: undefined });

                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if lifter id is missing');
            });

            describe('when event existence cannot be determined', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.eventExists.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(unregisterEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if event existence cannot be determined');
                });
            });

            describe('when event does not exist', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(false);
                });

                afterEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(unregisterEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if event does not exist');
                });
            });

            describe('when lifter existence cannot be determined', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.lifterExists.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(unregisterEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter existence cannot be determined');
                });
            });

            describe('when the lifter does not exist', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(false);
                });

                afterEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(unregisterEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter does not exist');
                });
            });

            describe('when the unregister call fails', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.unregisterLifter.rejects(new Error('call failed'));
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(unregisterEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if unregister call fails');
                });
            });
        });
    });

    describe('when retrieving all event results', () => {
        
        const getAllEvent = {
            action: 'getAll',
        };

        beforeEach(() => {

            sinon.stub(eventResultsFunction, 'getAllResults');
            eventResultsFunction.getAllResults.resolves([]);
        });

        afterEach(() => {
            
            eventResultsFunction.getAllResults.restore();
        });

        describe('Positive Tests', () => {

            it('should resolve', async () => {
                
                await handler(getAllEvent, context);
            });
        });
        
        describe('Negative Tests', () => {

            describe('when call for all results fails', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.getAllResults.rejects(new Error('call failed'));
                });

                it('should error', async () => {
                    
                    try {
                        await handler(getAllEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if db call fails');
                });
            });
        });
    });

    describe('when updating a record', () => {
        
        const updateEvent = {
            action: 'lifterUpdate',
            eventId: 'foo',
            lifterId: 'bar',
            weight: '80',
            eventType: eventTypes.LONG_CYCLE,
            eventDuration: durations.FIVE,
            weightClass: weightClasses.MIDDLEWEIGHT,
            gender: genders.MEN,
            details: {
                kettlebellWeight: 'foobar',
                totalRepetitions: 60,
            },
        };

        beforeEach(() => {
            
            sinon.stub(eventResultsFunction, 'eventExists');
            sinon.stub(eventResultsFunction, 'lifterExists');
            sinon.stub(eventResultsFunction, 'getScore');
            sinon.stub(eventResultsFunction, 'getRanking');
            sinon.stub(eventResultsFunction, 'updateRecord');
            eventResultsFunction.eventExists.resolves(true);
            eventResultsFunction.lifterExists.resolves(true);
            eventResultsFunction.getScore.resolves(0);
            eventResultsFunction.getRanking.resolves(rankings.RANK_III);
            eventResultsFunction.updateRecord.resolves('success');
        });

        afterEach(() => {
            
            eventResultsFunction.eventExists.restore();
            eventResultsFunction.lifterExists.restore();
            eventResultsFunction.getScore.restore();
            eventResultsFunction.getRanking.restore();
            eventResultsFunction.updateRecord.restore();
        });

        describe('Positive Tests', () => {

            it('should resolve if update is successful', async () => {
                
                await handler(updateEvent, context);
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if event id is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { eventId: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if event id is missing');
            });

            it('should error if lifter id is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { lifterId: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if lifter id is missing');
            });

            it('should error if details are missing', async () => {
                
                const event = Object.assign({}, updateEvent, { details: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if details are missing');
            });

            it('should error if invalid details are provided', async () => {
                
                const event = Object.assign({}, updateEvent, { details: { foo: 'bar' } });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if invalid details are provided');
            });

            it('should error if lifter weight is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { weight: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if weight is missing');
            });

            it('should error if event type is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { eventType: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if event type is missing');
            });

            it('should error if event duration is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { eventDuration: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if event duration is missing');
            });

            it('should error if weight class is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { weightClass: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if weight class is missing');
            });

            it('should error if gender is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { gender: undefined });
                
                try {
                    await handler(event, context);
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if gender is missing');
            });

            describe('when event existence cannot be determined', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.eventExists.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if event existence cannot be determined');
                });
            });

            describe('when event does not exist', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(false);
                });

                afterEach(() => {
                    
                    eventResultsFunction.eventExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if event does not exist');
                });
            });

            describe('when lifter existence cannot be determined', () => {

                beforeEach(() => {
                    
                    eventResultsFunction.lifterExists.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter existence cannot be determined');
                });
            });

            describe('when the lifter does not exist', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(false);
                });

                afterEach(() => {
                    
                    eventResultsFunction.lifterExists.resolves(true);
                });
                
                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter does not exist');
                });
            });

            describe('when scoring call fails', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.getScore.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.getScore.resolves(0);
                });

                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if get score call fails');
                });
            });

            describe('when ranking call fails', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.getRanking.rejects(new Error('call failed'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.getRanking.resolves(rankings.RANK_III);
                });

                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if get ranking call fails');
                });
            });

            describe('when update call fails', () => {
                
                beforeEach(() => {
                    
                    eventResultsFunction.updateRecord.rejects(new Error('could not update record'));
                });

                afterEach(() => {
                    
                    eventResultsFunction.updateRecord.resolves('success');
                });

                it('should error', async () => {
                    
                    try {
                        await handler(updateEvent, context);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if update call fails');
                });
            });
        });
    });
});