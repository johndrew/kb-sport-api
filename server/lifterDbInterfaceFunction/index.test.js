const assert = require('assert');
const sinon = require('sinon');
const eventFunction = require('./index');

const { handler } = eventFunction;

describe(__filename, () => {

    describe('when bad input is sent', () => {
        
        it('should error if event is missing', async () => {

            try {
                await handler(undefined, {});
            } catch (e) {
                assert.ok(e);
                return;
            }

            throw new Error('should not resolve if event is missing');
        });

        it('should error if action is missing', async () => {

            const event = { action: undefined };
            
            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if action is missing');
        });

        it('should error if action is invalid', async () => {
            
            const event = { action: 'foo' };

            try {
                await handler(event, {});
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if action is invalid');
        });
    });

    describe('when a lifter is being added', () => {

        const addEvent = {
            action: 'add',
            firstName: 'taylor',
            lastName: 'johndrew',
            gender: 'men',
        };

        before(() => {
            
            sinon.stub(eventFunction, 'addToDb');
            sinon.stub(eventFunction, 'lifterExists')
        });

        after(() => {
            
            eventFunction.addToDb.restore();
            eventFunction.lifterExists.restore()
        });
        
        describe('Positive Tests', () => {

            before(() => {
                
                eventFunction.addToDb.resolves({ lifterId: 'foo' });
                eventFunction.lifterExists.resolves(false);
            });

            it('should resolve if lifter is successfully added to db', async () => {
                
                await handler(addEvent, {});
            });

            it('should return lifterId', async () => {
                
                const { lifterId } = await handler(addEvent, {});
                assert.ok(lifterId);
            });

            it('should not error if weight class is missing', async () => {
                
                const event = Object.assign({}, addEvent, { weightClass: undefined });

                await handler(event, {});
            });
        });
        
        describe('Negative Tests', () => {

            describe('when database connection issue occurs', () => {
                
                before(() => {

                    eventFunction.addToDb.rejects(new Error('could not connect to db'));
                });

                it('should error if connection error occurs', async () => {
                    
                    try {
                        await handler(addEvent);
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if db connection error occurs');
                });
            });

            describe('when a lifter already exists', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.resolves(true);
                });

                it('should error if lifter already exists', async () => {
                    
                    try {
                        await handler(addEvent, {})
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter already exists');
                })
            });

            describe('when call to see if a lifter exists fails', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.rejects(new Error('lifter exists call failed'));
                });

                it('should error if lifter existence cannot be determined', async () => {
                    
                    try {
                        await handler(addEvent, {})
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter exists call fails');
                });
            });

            it('should error if first name is missing', async () => {

                const event = Object.assign({}, addEvent, { firstName: undefined });
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if first name is missing');
            });

            it('should error if last name is missing', async () => {

                const event = Object.assign({}, addEvent, { lastName: undefined });
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if last name is missing');
            });

            it('should error if gender is missing', async () => {

                const event = Object.assign({}, addEvent, { gender: undefined });
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if gender is missing');
            });

            it('should error if gender is invalid', async () => {

                const event = Object.assign({}, addEvent, { gender: 'foo' });
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if gender is invalid');
            });

            it('should error if weight class is invalid', async () => {
                
                const event = Object.assign({}, addEvent, { weightClass: 'foo' });

                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if weight class is invalid');
            });
        });
    });

    describe('when a lifter is being deleted', () => {

        const deleteEvent = {
            action: 'delete',
            lifterId: 'foo',
        };

        before(() => {
            
            sinon.stub(eventFunction, 'deleteFromDb');
            sinon.stub(eventFunction, 'lifterExists');
        });

        after(() => {
            
            eventFunction.deleteFromDb.restore();
            eventFunction.lifterExists.restore();
        });
        
        describe('Positive Tests', () => {
            
            before(() => {
                
                eventFunction.deleteFromDb.resolves('success');
                eventFunction.lifterExists.resolves(true);
            });

            it('should resolve if delete is successful', async () => {
                
                await handler(deleteEvent, {});
            });
        });
        
        describe('Negative Tests', () => {

            describe('when a database connection issue occurs', () => {
                
                before(() => {
                    
                    eventFunction.deleteFromDb.rejects(new Error('could not delete from db'));
                });

                it('should error if connection issue occurs', async () => {
                    
                    try {
                        await handler(deleteEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if connection issue occurs');
                });
            });

            describe('when a lifter does not exist in database', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.resolves(false);
                });

                it('should error if lifter does not exist', async () => {
                    
                    try {
                        await handler(deleteEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter does not exist');
                });
            });

            describe('when a call to check lifter existence fails', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.rejects(new Error('lifter exists call failed'));
                });

                it('should error if lifter exists call fails', async () => {
                    
                    try {
                        await handler(deleteEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter exists call fails');
                });
            });

            it('should error if lifterId is missing', async () => {

                const event = Object.assign({}, deleteEvent, { lifterId: undefined });
                
                try {
                    await handler(event, {})
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if lifterId is missing');
            });
        });
    });

    describe('when all lifters are requested', () => {
        
        const getAllEvent = {
            action: 'getAll'
        };

        before(() => {
            
            sinon.stub(eventFunction, 'getAllFromDb');
        });

        after(() => {
            
            eventFunction.getAllFromDb.restore();
        });

        describe('Positive Tests', () => {

            const lifters = [{
                lifterId: 'foo',
                firstName: 'sharon',
                lastName: 'feldman',
                gender: 'women',
            }];

            before(() => {
                
                eventFunction.getAllFromDb.resolves(lifters);
            });

            it('should return lifters', async () => {
                
                const actual = await handler(getAllEvent, {});
                assert.deepEqual(actual, lifters);
            });
        });
        
        describe('Negative Tests', () => {

            before(() => {
                
                eventFunction.getAllFromDb.rejects(new Error('get failure'));
            });

            it('should error if get call fails', async () => {
                
                try {
                    await handler(getAllEvent, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if get call fails');
            });
        });
    });

    describe('when a lifter is being updated', () => {

        const updateEvent = {
            action: 'update',
            lifterId: 'foo',
            fields: {
                weightClass: 'Flyweight',
            },
        };
        
        before(() => {
            
            sinon.stub(eventFunction, 'updateInDb');
            sinon.stub(eventFunction, 'lifterExists');
        });

        after(() => {
            
            eventFunction.updateInDb.restore();
            eventFunction.lifterExists.restore();
        });

        describe('Positive Tests', () => {

            before(() => {
                
                eventFunction.updateInDb.resolves('success');
                eventFunction.lifterExists.resolves(true);
            });

            it('should resolve', async () => {
                
                await handler(updateEvent, {});
            });
        });
        
        describe('Negative Tests', () => {

            describe('when update call fails', () => {
                
                before(() => {
                    
                    eventFunction.updateInDb.rejects(new Error('update call failed'));
                });

                it('should error if update call fails', async () => {

                    try {
                        await handler(updateEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if update call fails');
                });
            });

            describe('when lifter does not exist', () => {
                
                before(() => {
                    
                    eventFunction.updateInDb.resolves('success');
                    eventFunction.lifterExists.resolves(false);
                });

                it('should error if lifter does not exist', async () => {
                    
                    try {
                        await handler(updateEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter does not exist');
                });
            });

            describe('when a call to check lifter existence fails', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.rejects(new Error('lifter exists call failed'));
                });

                it('should error if lifter exists call fails', async () => {
                    
                    try {
                        await handler(updateEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if lifter exists call fails');
                });
            });

            it('should error if lifterId is missing', async () => {

                const event = Object.assign({}, updateEvent, { lifterId: undefined });
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if lifterId is missing');
            });

            it('should error if fields property is missing', async () => {
                
                const event = Object.assign({}, updateEvent, { fields: undefined });

                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if fields is missing');
            });

            it('should error if fields is empty', async () => {
                
                const event = Object.assign({}, updateEvent, { fields: {} });

                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if fields is empty');
            });

            it('should error if an invalid field is provided', async () => {

                const event = JSON.parse(JSON.stringify(updateEvent));
                event.fields.foo = 'bar';

                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if invalid fields are provided');
            });

            it('should error if weightClass is invalid', async () => {
                
                const event = JSON.parse(JSON.stringify(updateEvent));
                event.fields.weightClass = 'foo';


                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if weightClass is invalid');
            });
        });
    });
});