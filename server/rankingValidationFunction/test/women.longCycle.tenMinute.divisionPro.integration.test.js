const {
  strictEqual,
} = require('assert');
const {
  durations,
  eventTypes,
  genders,
  kettlebellWeights,
  rankings,
  weightClasses,
} = require('../../shared/enums');
const {
  getRanking,
  testErrorCode,
} = require('./util/getRankingUtil');

describe(__filename, () => {
  let params;
  beforeEach(() => {
    params = {
      gender: genders.WOMEN,
      eventType: eventTypes.LONG_CYCLE,
      duration: durations.TEN,
      kettlebellWeight: kettlebellWeights.TWENTYFOUR,
    };
  });

  describe('Positive Tests', () => {
    const timeout = 4000;

    describe(weightClasses.STRAWWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.STRAWWEIGHT;
      });

      it('returns MSIC for repetitions greater than or equal to 45', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          70, 60, 55, 50,
          49, 48, 47, 46, 45,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.MSIC;
        results.forEach((actual) => strictEqual(actual, expected));
      });
      
      it('returns MS for repetitions less than 45 and greater than or equal to 32', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          44, 43, 42, 41, 40,
          39, 38, 37, 36, 35, 34, 33, 32,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.MS;
        results.forEach((actual) => strictEqual(actual, expected));
      });
      
      it('returns CMS for repetitions less than 32 and greater than or equal to 26', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          31, 30,
          29, 28, 27, 26,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });
      
      it('returns Rank I for repetitions less than 26 and greater than or equal to 20', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          25, 24, 23, 22, 21, 20,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.FLYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.FLYWEIGHT;
      });

      it('returns MSIC for repetitions greater than or equal to 48', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          80, 70, 60, 55,
          52, 51, 50, 49, 48,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.MSIC;
        results.forEach((actual) => strictEqual(actual, expected));
      });
      
      it('returns MS for repetitions less than 48 and greater than or equal to 36', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          47, 46, 45, 44, 43, 42, 41, 40,
          39, 38, 37, 36,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.MS;
        results.forEach((actual) => strictEqual(actual, expected));
      });
      
      it('returns CMS for repetitions less than 36 and greater than or equal to 29', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          35, 34, 33, 32, 31, 30,
          29,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });
      
      it('returns Rank I for repetitions less than 29 and greater than or equal to 23', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          28, 27, 26, 25, 24, 23,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });
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
        const expected = rankings.MSIC;
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
        const expected = rankings.MS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns CMS for repetitions less than 41 and greater than or equal to 33', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          40,
          39, 38, 37, 36, 35, 34, 33,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 33 and greater than or equal to 26', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          32, 31, 30,
          29, 28, 27, 26,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
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
        const expected = rankings.MSIC;
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
        const expected = rankings.MS;
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
        const expected = rankings.CMS;
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
        const expected = rankings.RANK_I;
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
        const expected = rankings.MSIC;
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
        const expected = rankings.MS;
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
        const expected = rankings.CMS;
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
        const expected = rankings.RANK_I;
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
        const expected = rankings.MSIC;
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
        const expected = rankings.MS;
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
        const expected = rankings.CMS;
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
        const expected = rankings.RANK_I;
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
        const expected = rankings.MSIC;
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
        const expected = rankings.MS;
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
        const expected = rankings.CMS;
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
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });
  });

  describe('Negative Tests', () => {
    const timeout = 4000;

    describe(weightClasses.STRAWWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.STRAWWEIGHT;
      });

      it('returns 404 for repetitions less than 20', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          19, 18, 17, 16, 15,
          10, 5, 1,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 404));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.FLYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.FLYWEIGHT;
      });

      it('returns 404 for repetitions less than 23', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          22, 21, 20,
          15, 10, 5, 1,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 404));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.BANTAMWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.BANTAMWEIGHT;
      });

      it('returns 404 for repetitions less than 26', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          25, 24, 23, 22, 21, 20,
          15, 10, 5, 1,
        ];

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
          28, 27, 26, 25,
          20, 15, 10, 5, 1,
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
          29, 28, 27,
          25, 20, 15, 10, 5, 1,
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
          25, 20, 15, 10, 5, 1,
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
          37, 36, 35, 34, 33,
          30, 25, 20, 15, 10, 5, 1,
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

      it('returns 404 for repetitions less than 40', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          39, 38, 37, 36, 35,
          30, 25, 20, 15, 10, 5, 1,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 404));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.MIDDLEWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.MIDDLEWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          74, 62, 50, 40,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          78, 65, 52, 42,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.CRUISERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.CRUISERWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          81, 68, 54, 44,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.HEAVYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.HEAVYWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          84, 70, 56, 45,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          86, 72, 58, 46,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });
  });
});
