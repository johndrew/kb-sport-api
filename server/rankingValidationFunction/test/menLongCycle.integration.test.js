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
}

const test404 = async (params) => {
  const options = Object.assign({}, getRequestOptions(params), {
    resolveWithFullResponse: true,
  });

  let passes = false;
  try {
    await request(options);
  } catch (e) {
    passes = e.statusCode && e.statusCode === 404;
  }

  return passes;
}

describe(__filename, () => {
  let params;
  beforeEach(() => {
    params = {
      gender: genders.MEN,
      eventType: eventTypes.LONG_CYCLE,
    };
  });

  describe('Positive Tests', () => {
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

          it('returns MSIC for repetitions greater than or equal to 52', async () => {
            const testRepetitions = [70, 65, 60, 55, 54, 53, 52];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 52 and greater than or equal to 41', async () => {
            const testRepetitions = [51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 41 and greater than or equal to 33', async () => {
            const testRepetitions = [40, 39, 38, 37, 36, 35, 34, 33];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 33 and greater than or equal to 26', async () => {
            const testRepetitions = [32, 31, 30, 29, 28, 27, 26];

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

          it('returns MSIC for repetitions greater than or equal to 56', async () => {
            const testRepetitions = [70, 65, 60, 59, 58, 57, 56];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 56 and greater than or equal to 45', async () => {
            const testRepetitions = [55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 45 and greater than or equal to 36', async () => {
            const testRepetitions = [44, 43, 42, 41, 40, 39, 38, 37, 36];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 36 and greater than or equal to 29', async () => {
            const testRepetitions = [35, 34, 33, 32, 31, 30, 29];

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

          it('returns MSIC for repetitions greater than or equal to 60', async () => {
            const testRepetitions = [100, 90, 80, 75, 70, 65, 60];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MSIC';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 60 and greater than or equal to 50', async () => {
            const testRepetitions = [59, 58, 57, 56, 55, 54, 53, 52, 51, 50];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'MS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 50 and greater than or equal to 40', async () => {
            const testRepetitions = [49, 48, 47, 46, 45, 44, 43, 42, 41, 40];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => getRanking(params));

            const results = await Promise.all(tests);
            const expected = 'CMS';
            results.forEach((actual) => strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 40 and greater than or equal to 32', async () => {
            const testRepetitions = [39, 38, 37, 36, 35, 34, 33, 32];

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
            this.timeout(4000);

            const testRepetitions = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1];

            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => test404(params));

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
            this.timeout(4000);

            const testRepetitions = [
              28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => test404(params));
  
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
            this.timeout(4000);

            const testRepetitions = [
              31, 30,
              29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];
  
            const tests = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            })).map(params => test404(params));
  
            const results = await Promise.all(tests);
            const expected = true;
            results.forEach((actual) => strictEqual(actual, expected));
          });
        });
      });
    });
  });
});
