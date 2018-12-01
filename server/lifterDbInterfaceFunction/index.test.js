const assert = require('assert');
const sinon = require('sinon');
const eventFunction = require('./index');
const { weightClasses, genders } = require('../shared/enums')

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
            gender: genders.WOMEN,
            fields: {
                weight: '75',
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

            it('should error if weight is invalid', async () => {
                
                const event = JSON.parse(JSON.stringify(updateEvent));
                event.fields.weight = true;

                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }

                event.fields.weight = '-1';

                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if weightClass is invalid');
            });

            it('should error if gender is missing', async () => {

                const event = JSON.parse(JSON.stringify(updateEvent));
                event.gender = undefined;
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if gender is missing');
            });
        });
    });

    describe('when checking if a lifter exists', () => {

        const lifterExistEvent = {
            action: 'exists',
            lifterId: 'foo',
        };

        before(() => {
            
            sinon.stub(eventFunction, 'lifterExists');
        });

        after(() => {
            
            eventFunction.lifterExists.restore();
        });
        
        describe('Positive Tests', () => {

            describe('when a lifter does exist', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.resolves(true);
                });

                it('should return false', async () => {
                    
                    const actual = await handler(lifterExistEvent, {});
                    assert.strictEqual(actual, true);
                });
            });

            describe('when a lifter does not exist', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.resolves(false);
                });

                it('should return false', async () => {
                    
                    const actual = await handler(lifterExistEvent, {});
                    assert.strictEqual(actual, false);
                });
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if lifter id is missing', async () => {

                const event = Object.assign({}, lifterExistEvent, { lifterId: undefined });
                
                try {
                    await handler(event, {});
                } catch (e) {
                    assert.ok(e);
                    return;
                }
                
                throw new Error('should not resolve if lifter id is missing');
            });

            describe('when network call fails', () => {
                
                before(() => {
                    
                    eventFunction.lifterExists.rejects(new Error('call failed'));
                });

                it('should error if call fails', async () => {
                    
                    try {
                        await handler(lifterExistEvent, {});
                    } catch (e) {
                        assert.ok(e);
                        return;
                    }
                    
                    throw new Error('should not resolve if network call fails');
                });
            });
        });
    });

    context('method getWeightClass', () => {
        
        describe('Positive Tests', () => {
            
            it('should return strawweight for women for weights equal to or below 52.2', () => {
                
                const testWeights = [0, 1, 10, 30, 50, 51, 52, '51.1', '52.2'];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.STRAWWEIGHT);
            });

            it('should return flyweight for women for weights between 52.2 and 56.7', () => {
                
                const testWeights = ['52.3', 53, 54, 55, 56, 56.6, 56.7];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.FLYWEIGHT);
            });

            it('should return bantamweight for women for weights between 56.7 and 61.2', () => {
                
                const testWeights = [56.8, 57, 58, 59, 60, 61, 61.1, '61.2'];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.BANTAMWEIGHT);
            });

            it('should return bantamweight for men for weights equal to or below 61.2', () => {
                
                const testWeights = [0, 1, 10, 30, 60, 61, 61.1, '61.2'];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.BANTAMWEIGHT);
            });

            it('should return featherweight for weights between 61.2 and 65.8', () => {
                
                const testWeights = [61.3, 61.4, 62, 63, 64, 65, 65.7, 65.8];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.FEATHERWEIGHT);
            });

            it('should return lightweight for weights between 65.8 and 70.3', () => {
                
                const testWeights = [65.9, 66, 67, 68, 69, 70, 70.2, 70.3];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.LIGHTWEIGHT);
                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.LIGHTWEIGHT);
            });
            
            it('should return super lightweight for weights between 70.3 and 74.3', () => {
                
                const testWeights = [70.4, 70.5, 71, 72, 73, 74, 74.2, 74.3];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.SUPER_LIGHTWEIGHT);
                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.SUPER_LIGHTWEIGHT);
            });

            it('should return welterweight for weights between 74.3 and 79.4', () => {
                
                const testWeights = [74.4, 74.5, 75, 76, 77, 78, 79, 79.3, 79.4];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.WELTERWEIGHT);
                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.WELTERWEIGHT);
            });

            it('should return super welterweight for women weights above 79.4', () => {
                
                const testWeights = [79.5, 79.6, 80, 90, 100, 102, 102.1, 150];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.WOMEN)))
                    assert.strictEqual(weightClass, weightClasses.SUPER_WELTERWEIGHT);
            });

            it('should return middleweight for men weights between 79.4 and 83.9', () => {
                
                const testWeights = [79.5, 79.6, 80, 81, 82, 83, 83.8, 83.9];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.MIDDLEWEIGHT);
            });

            it('should return super middleweight for men weights between 83.9 and 88.5', () => {
                
                const testWeights = [84, 84.1, 85, 86, 87, 88, 88.4, 88.5];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.SUPER_MIDDLEWEIGHT);
            });

            it('should return cruiserweight for men weights between 88.5 and 93', () => {
                
                const testWeights = [88.6, 88.7, 89, 90, 91, 92, 92.9, 93];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.CRUISERWEIGHT);
            });

            it('should return heavyweight for men weights between 93 and 102.1', () => {
                
                const testWeights = [93.1, 93.2, 94, 95, 96, 97, 98, 99, 100, 101, 101.0, 102, 102.1];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.HEAVYWEIGHT);
            });

            it('should return super heavyweight for men weights above 102.1', () => {
                
                const testWeights = [102.2, 102.3, 103, 105, 110, 125, 150];

                for (let weightClass of testWeights.map(weight => eventFunction.getWeightClass(weight, genders.MEN)))
                    assert.strictEqual(weightClass, weightClasses.SUPER_HEAVYWEIGHT);
            });
        });
        
        describe('Negative Tests', () => {

            it('should error if weight is missing', () => {
                
                assert.throws(() => {
                    handler.getWeightClass(null, 'women');
                });
            });

            it('should error if gender is missing', () => {
                
                assert.throws(() => {
                    handler.getWeightClass('75', null);
                });
            });
        });
    });
});