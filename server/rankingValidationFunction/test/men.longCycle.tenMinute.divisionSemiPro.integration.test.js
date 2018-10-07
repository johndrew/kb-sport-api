const {
  strictEqual,
} = require('assert');
const {
  divisions,
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
      gender: genders.MEN,
      eventType: eventTypes.LONG_CYCLE,
      duration: durations.TEN,
      kettlebellWeight: kettlebellWeights.TWENTYEIGHT,
    };
  });

  describe('Positive Tests', () => {
    const timeout = 4000;

    describe(weightClasses.BANTAMWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.BANTAMWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 52', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 80, 75, 70, 65, 60, 55, 54, 53, 52,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 52 and greater than or equal to 39', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          51, 50,
          49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
          39,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 39 and greater than or equal to 31', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          38, 37, 36, 35, 34, 33, 32, 31
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 31 and greater than or equal to 25', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          30,
          29, 28, 27, 26, 25,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.FEATHERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.FEATHERWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 56', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 80, 75, 70, 65, 60,
          59, 58, 57, 56,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 56 and greater than or equal to 43', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          55, 54, 53, 52, 51, 50,
          49, 48, 47, 46, 45, 44, 43,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 43 and greater than or equal to 35', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          42, 41, 40,
          39, 38, 37, 36, 35,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 35 and greater than or equal to 28', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          34, 33, 32, 31, 30,
          29, 28,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.LIGHTWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.LIGHTWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 60', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 80, 75, 70, 65,
          64, 63, 62, 61, 60,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 60 and greater than or equal to 48', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
          49, 48,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 48 and greater than or equal to 38', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          47, 46, 45, 44, 43, 42, 41, 40,
          39, 38,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 38 and greater than or equal to 31', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          37, 36, 35, 34, 33, 32, 31,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 64', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 85, 80, 70, 74, 70,
          69, 68, 67, 66, 65, 64,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 64 and greater than or equal to 52', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          63, 62, 61, 60,
          59, 58, 57, 56, 55, 54, 53, 52,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 52 and greater than or equal to 41', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          51, 50,
          49, 48, 47, 46, 45, 44, 43, 42, 41,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 41 and greater than or equal to 33', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          40,
          39, 38, 37, 36, 35, 34, 33,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.WELTERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.WELTERWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 69', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 85, 80, 75,
          74, 73, 72, 71, 70, 69,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 69 and greater than or equal to 57', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          68, 67, 66, 65, 64, 63, 62, 61, 60,
          59, 58, 57,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 57 and greater than or equal to 45', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          56, 55, 54, 53, 52, 51, 50,
          49, 48, 47, 46, 45,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 45 and greater than or equal to 36', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          44, 43, 42, 41, 40,
          39, 38, 37, 36,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.MIDDLEWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.MIDDLEWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 74', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 85, 80,
          79, 78, 77, 76, 75, 74,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 74 and greater than or equal to 60', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          73, 72, 71, 70,
          69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 60 and greater than or equal to 48', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
          49, 48,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 48 and greater than or equal to 38', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          47, 46, 45, 44, 43, 42, 41, 40,
          39, 38,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 78', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90, 85,
          84, 83, 82, 81, 80, 79, 78,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 78 and greater than or equal to 63', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          77, 76, 75, 74, 73, 72, 71, 70,
          69, 68, 67, 66, 65, 64, 63,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 63 and greater than or equal to 50', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          62, 61, 60,
          59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 50 and greater than or equal to 40', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.CRUISERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.CRUISERWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 81', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90,
          89, 88, 87, 86, 85, 84, 83, 82, 81,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 81 and greater than or equal to 65', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          80,
          79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
          69, 68, 67, 66, 65,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 65 and greater than or equal to 52', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          64, 63, 62, 61, 60,
          59, 58, 57, 56, 55, 54, 53, 52,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 52 and greater than or equal to 42', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          51, 50,
          49, 48, 47, 46, 45, 44, 43, 42,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.HEAVYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.HEAVYWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 84', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 90,
          89, 88, 87, 86, 85, 84,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 84 and greater than or equal to 67', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          83, 82, 81, 80,
          79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
          69, 68, 67,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 67 and greater than or equal to 54', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          66, 65, 64, 63, 62, 61, 60,
          59, 58, 57, 56, 55, 54,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 54 and greater than or equal to 43', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          53, 52, 51, 50,
          49, 48, 47, 46, 45, 44, 43,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
      });

      it('returns CMS for repetitions greater than or equal to 86', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          100, 95,
          94, 93, 92, 91, 90,
          89, 88, 87, 86,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.CMS;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank I for repetitions less than 86 and greater than or equal to 69', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          85, 84, 83, 82, 81, 80,
          79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
          69,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_I;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank II for repetitions less than 69 and greater than or equal to 55', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          68, 67, 66, 65, 64, 63, 62, 61, 60,
          59, 58, 57, 56, 55,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_II;
        results.forEach((actual) => strictEqual(actual, expected));
      });

      it('returns Rank III for repetitions less than 55 and greater than or equal to 44', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          54, 53, 52, 51, 50,
          49, 48, 47, 46, 45, 44,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => getRanking(params));

        const results = await Promise.all(tests);
        const expected = rankings.RANK_III;
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

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          45, 31, 25, 20,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.FLYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.FLYWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          48, 35, 28, 22,
        ];

        const tests = testRepetitions.map(rep => Object.assign({}, params, {
          repetitions: rep,
        })).map(params => testErrorCode(params, 400));

        const results = await Promise.all(tests);
        const expected = true;
        results.forEach((actual) => strictEqual(actual, expected));
      });
    });

    describe(weightClasses.BANTAMWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.BANTAMWEIGHT;
      });

      it('returns 404 for repetitions less than 25', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          24, 23, 22, 21, 20,
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

      it('returns 404 for repetitions less than 28', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          27, 26, 25, 24, 23,
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

      it('returns 404 for repetitions less than 31', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          30,
          29, 28, 27, 26, 25,
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

    describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
      });

      it('returns 404 for repetitions less than 33', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          32, 31, 30,
          29, 28, 27, 26, 25,
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

    describe(weightClasses.WELTERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.WELTERWEIGHT;
      });

      it('returns 404 for repetitions greater than or equal to 36', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          35, 34, 33, 32, 31, 30,
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

    describe(weightClasses.SUPER_WELTERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_WELTERWEIGHT;
      });

      it('returns 400 for valid repetitions', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          74, 60, 48, 38,
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

    describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
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

    describe(weightClasses.CRUISERWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.CRUISERWEIGHT;
      });

      it('returns 404 for repetitions less than 42', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          41, 40,
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

    describe(weightClasses.HEAVYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.HEAVYWEIGHT;
      });

      it('returns 404 for repetitions less than 43', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          42, 41, 40,
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

    describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
      beforeEach(() => {
        params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
      });

      it('returns 404 for repetitions less than 44', async function i() {
        this.timeout(timeout);

        const testRepetitions = [
          43, 42, 41, 40,
          35, 30, 25, 20, 15, 10, 5, 1,
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
