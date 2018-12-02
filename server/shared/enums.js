const weightClasses = Object.freeze({
  STRAWWEIGHT: 'Strawweight',
  FLYWEIGHT: 'Flyweight',
  BANTAMWEIGHT: 'Bantamweight',
  FEATHERWEIGHT: 'Featherweight',
  LIGHTWEIGHT: 'Lightweight',
  SUPER_LIGHTWEIGHT: 'Super Lightweight',
  WELTERWEIGHT: 'Welterweight',
  SUPER_WELTERWEIGHT: 'Super Welterweight',
  MIDDLEWEIGHT: 'Middleweight',
  SUPER_MIDDLEWEIGHT: 'Super Middleweight',
  CRUISERWEIGHT: 'Cruiserweight',
  HEAVYWEIGHT: 'Heavyweight',
  SUPER_HEAVYWEIGHT: 'Super Heavyweight',
});

const kettlebellWeights = Object.freeze({
  EIGHT: 8,
  TWELVE: 12,
  SIXTEEN: 16,
  TWENTY: 20,
  TWENTYFOUR: 24,
  TWENTYEIGHT: 28,
  THIRTYTWO: 32,
});

const genders = Object.freeze({
  MEN: 'men',
  WOMEN: 'women',
});

const eventTypes = Object.freeze({
  JERK: 'Jerk',
  SNATCH: 'Snatch',
  BIATHLON: 'Biathlon',
  LONG_CYCLE: 'Long Cycle',
});

const durations = Object.freeze({
  FIVE: '5min',
  TEN: '10min',
});

const divisions = Object.freeze({
  PRO: 'PRO Division',
  SEMI_PRO: 'Semi PRO Division',
  AMATEUR: 'Amateur Division',
  SEMI_AMATEUR: 'Semi Amateur Division',
  BEGINNERS: 'Beginners Division',
});

const rankings = Object.freeze({
  MSIC: 'MSIC',
  MS: 'MS',
  CMS: 'CMS',
  RANK_I: 'Rank I',
  RANK_II: 'Rank II',
  RANK_III: 'Rank III',
  NO_RANK: 'No Rank',
});

module.exports = {
  divisions,
  durations,
  eventTypes,
  genders,
  kettlebellWeights,
  rankings,
  weightClasses,
}