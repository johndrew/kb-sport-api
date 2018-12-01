const VALID_FORMULA_TYPES = Object.freeze({
    LONG_CYCLE: 'longCycle',
    SNATCH: 'snatch',
    JERK: 'jerk',
    OALC: 'OALC',
});

function validateEvent(event) {
    
    if (!event) throw new Error('event is required');
    if (!event.formulaType) throw new Error('formulaType is required');
    if (Object.values(VALID_FORMULA_TYPES).indexOf(event.formulaType) < 0) throw new Error(`formulaType ${event.formulaType} is invalid`);
    if (!event.kettlebellWeight) throw new Error('kettlebellWeight is required');
    if (!event.weight) throw new Error('lifter weight is required');
    if (!event.totalRepetitions) throw new Error('total repetitions is required');
}

exports.handler = async (event, context) => {

    validateEvent(event);

    let indexA;
    let indexB;
    let indexC;
    let indexD;

    switch (event.formulaType) {
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