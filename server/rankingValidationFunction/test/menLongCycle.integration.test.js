const {
  strictEqual,
} = require('assert');
const {
  eventTypes,
  durations,
  genders,
  kettlebellWeights,
  weightClasses,
} = require('../../shared/enums');
const request = require('request-promise');

const getRequestOptions = (params) => {
  return {
    uri: 'https://03zvdlhqz0.execute-api.us-west-2.amazonaws.com/dev/getRanking',
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  }
};

const getRanking = async (params) => {
  const options = getRequestOptions(params);

  return request(options)
    .then(result => JSON.parse(result))
    .then(({ ranking }) => ranking);
};

const testErrorCode = async (params, statusCode) => {
  const options = Object.assign({}, getRequestOptions(params), {
    resolveWithFullResponse: true,
  });

  let passes = false;
  try {
    await request(options);
  } catch (e) {
    passes = e.statusCode && e.statusCode === statusCode;
  }

  return passes;
};

describe(__filename, () => {
  let params;
  beforeEach(() => {
    params = {
      gender: genders.MEN,
      eventType: eventTypes.LONG_CYCLE,
    };
  });

  describe('Positive Tests', () => {
    const timeout = 4000;

    describe('10 minute duration', () => {
      beforeEach(() => {
        params.duration = durations.TEN;
      });

      describe('PRO Division', () => {
        beforeEach(() => {
          params.kettlebellWeight = kettlebellWeights.THIRTYTWO;
        });

        describe(weightClasses.BANTAMWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.BANTAMWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 52', async function i() {
            this.timeout(timeout);

            const testRepetitions = [70, 65, 60, 55, 54, 53, 52];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 52 and greater than or equal to 41', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              51, 50,
              49, 48, 47, 46, 45, 44, 43, 42, 41,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 41 and greater than or equal to 33', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              40, 39, 38, 37, 36, 35, 34, 33,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 33 and greater than or equal to 26', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              32, 31, 30, 29, 28, 27, 26,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.FEATHERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.FEATHERWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 56', async function i() {
            this.timeout(timeout);

            const testRepetitions = [70, 65, 60, 59, 58, 57, 56];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 56 and greater than or equal to 45', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              55, 54, 53, 52, 51, 50,
              49, 48, 47, 46, 45,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 45 and greater than or equal to 36', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              44, 43, 42, 41, 40,
              39, 38, 37, 36,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 36 and greater than or equal to 29', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              35, 34, 33, 32, 31, 30,
              29,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.LIGHTWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.LIGHTWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 60', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 80, 75, 70, 65, 60];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 60 and greater than or equal to 50', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 50 and greater than or equal to 40', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 40 and greater than or equal to 32', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              39, 38, 37, 36, 35, 34, 33, 32,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 64', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 80, 75, 70, 65, 64];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 64 and greater than or equal to 54', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              63, 62, 61, 60,
              59, 58, 57, 56, 55, 54,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 54 and greater than or equal to 43', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              53, 52, 51, 50,
              49, 48, 47, 46, 45, 44, 43,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 43 and greater than or equal to 35', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              42, 41, 40, 39, 38, 37, 36, 35,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.WELTERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.WELTERWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 69', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 80, 75, 70, 69];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 69 and greater than or equal to 58', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              68, 67, 66, 65, 64, 63, 62, 61, 60,
              59, 58,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 58 and greater than or equal to 47', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              57, 56, 55, 54, 53, 52, 51, 50,
              49, 48, 47,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 47 and greater than or equal to 38', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              46, 45, 44, 43, 42, 41, 40, 39, 38,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.MIDDLEWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.MIDDLEWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 74', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 80, 75, 74];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 74 and greater than or equal to 62', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              73, 72, 71, 70,
              69, 68, 67, 66, 65, 64, 63, 62,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 62 and greater than or equal to 50', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              61, 60,
              59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 50 and greater than or equal to 40', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 78', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 80, 79, 78];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 78 and greater than or equal to 65', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              77, 76, 75, 74, 73, 72, 71, 70,
              69, 68, 67, 66, 65,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 65 and greater than or equal to 52', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              64, 63, 62, 61, 60,
              59, 58, 57, 56, 55, 54, 53, 52,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 52 and greater than or equal to 42', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              51, 50,
              49, 48, 47, 46, 45, 44, 43, 42,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.CRUISERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.CRUISERWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 81', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 85, 84, 83, 82, 81];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });
          
          it('returns MS for repetitions less than 81 and greater than or equal to 68', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              80,
              79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
              69, 68,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 68 and greater than or equal to 54', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              67, 66, 65, 64, 63, 62, 61, 60,
              59, 58, 57, 56, 55, 54,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 54 and greater than or equal to 44', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              53, 52, 51, 50,
              49, 48, 47, 46, 45, 44,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.HEAVYWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.HEAVYWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 84', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 85, 84];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 84 and greater than or equal to 70', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              83, 82, 81, 80,
              79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 70 and greater than or equal to 56', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
              59, 58, 57, 56,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 56 and greater than or equal to 45', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              55, 54, 53, 52, 51, 50,
              49, 48, 47, 46, 45,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 86', async function i() {
            this.timeout(timeout);

            const testRepetitions = [100, 90, 89, 88, 87, 86];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 86 and greater than or equal to 72', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              85, 84, 83, 82, 81, 80,
              79, 78, 77, 76, 75, 74, 73, 72,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });
          
          it('returns CMS for repetitions less than 72 and greater than or equal to 58', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              71, 70,
              69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
              59, 68,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 58 and greater than or equal to 46', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              57, 56, 55, 54, 53, 52, 51, 50,
              49, 48, 47, 46,
            ];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'Rank I';
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });
      });
    });
  });

  describe('Negative Tests', () => {
    const timeout = 5000;

    describe('10 minute duration', () => {
      beforeEach(() => {
        params.duration = durations.TEN;
      });

      describe('PRO Division', () => {
        beforeEach(() => {
          params.kettlebellWeight = kettlebellWeights.THIRTYTWO;
        });

        describe(weightClasses.BANTAMWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.BANTAMWEIGHT;
          });

          it('returns 404 for repetitions less than 26', async function i() {
            this.timeout(timeout);

            const testRepetitions = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));

            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.FEATHERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.FEATHERWEIGHT;
          });
  
          it('returns 404 for repetitions less than 29', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.LIGHTWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.LIGHTWEIGHT;
          });

          it('returns 404 for repetitions less than 32', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
          });

          it('returns 404 for repetitions less than 35', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.WELTERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.WELTERWEIGHT;
          });

          it('returns 404 for repetitions less than 38', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              37, 36, 35, 34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_WELTERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_WELTERWEIGHT;
          });

          it('returns 400 for valid repetitions', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              70, 60, 50,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 400));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.MIDDLEWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.MIDDLEWEIGHT;
          });

          it('returns 404 for repetitions less than 40', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              39, 38, 37, 36, 35, 34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
          });

          it('returns 404 for repetitions less than 42', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              41, 40,
              39, 38, 37, 36, 35, 34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.CRUISERWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.CRUISERWEIGHT;
          });

          it('returns 404 for repetitions less than 44', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              43, 42, 41, 40,
              39, 38, 37, 36, 35, 34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.HEAVYWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.HEAVYWEIGHT;
          });

          it('returns 404 for repetitions less than 45', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              44, 43, 42, 41, 40,
              39, 38, 37, 36, 35, 34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });

        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
          beforeEach(() => {
            params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
          });

          it('returns 404 for repetitions less than 46', async function i() {
            this.timeout(timeout);

            const testRepetitions = [
              45, 44, 43, 42, 41, 40,
              39, 38, 37, 36, 35, 34, 33, 32, 31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => testErrorCode(params, 404));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });
      });
    });
  });
});
