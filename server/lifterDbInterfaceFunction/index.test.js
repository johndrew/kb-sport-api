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
});