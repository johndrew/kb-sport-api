const { eventTypes, durations } = require('../shared/enums');

const VALID_FORMULA_TYPES = Object.freeze({
    LONG_CYCLE: 'longCycle',
    SNATCH: 'snatch',
    JERK: 'jerk',
    OALC: 'OALC',
});

function validateEvent(event) {
    
    if (!event) throw new Error('event is required');
    if (!event.eventType) throw new Error('eventType is required');
    if (!event.eventDuration) throw new Error('eventDuration is required');
    if (!event.kettlebellWeight) throw new Error('kettlebellWeight is required');
    if (!event.weight) throw new Error('lifter weight is required');
    if (!event.totalRepetitions) throw new Error('total repetitions is required');
}

function mapEventToFormula(eventType, duration) {

    switch (`${eventType}${duration}`) {
        case `${eventTypes.LONG_CYCLE}${durations.FIVE}`:
            return VALID_FORMULA_TYPES.OALC;
        case `${eventTypes.LONG_CYCLE}${durations.TEN}`:
            return VALID_FORMULA_TYPES.LONG_CYCLE;
        case `${eventTypes.JERK}${durations.FIVE}`:
        case `${eventTypes.JERK}${durations.TEN}`:
            return VALID_FORMULA_TYPES.JERK;
        case `${eventTypes.SNATCH}${durations.FIVE}`:
        case `${eventTypes.SNATCH}${durations.TEN}`:
            return VALID_FORMULA_TYPES.SNATCH;
        default:
            throw new Error(`unsupported event: ${eventType},${duration}`);
    }
}

exports.handler = async (event, context) => {

    validateEvent(event);

    const formulaType = mapEventToFormula(event.eventType, event.eventDuration);
    let indexA;
    let indexB;
    let indexC;
    let indexD;

    switch (formulaType) {
        case VALID_FORMULA_TYPES.LONG_CYCLE:
            indexA = 3.1;
            indexB = 160;
            indexC = 1.003;
            indexD = 7;
            break;
        case VALID_FORMULA_TYPES.SNATCH:
            indexA = 2.3;
            indexB = 80;
            indexC = 1.0015;
            indexD = 10;
            break;
        case VALID_FORMULA_TYPES.JERK:
            indexA = 3.1
            indexB = 160
            indexC = 1.002
            indexD = 20
            break;
        case VALID_FORMULA_TYPES.OALC:
            indexA = 2.4
            indexB = 80
            indexC = 1.002
            indexD = 7
            break;
        default:
            console.warn(`formula type ${formulaType} is not recognized`);
            break;
    }

    // This is called the KOEHORST formula
    return (
        Math.pow((event.kettlebellWeight / 6), indexA) *
        ((event.weight + indexB) / event.weight) * 
        (Math.pow(indexC, event.totalRepetitions) * event.totalRepetitions)
    ) / indexD;
}