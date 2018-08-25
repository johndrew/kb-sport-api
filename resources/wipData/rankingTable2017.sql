CREATE TABLE menRankingTable (
  score INT NOT NULL,
  ranking ENUM('MSIC', 'MS', 'CMS', 'I', 'II', 'III') NOT NULL,
  eventType ENUM('Jerk', 'Snatch', 'Biathlon', 'Long Cycle') NOT NULL,
  duration ENUM('10min', '5min') NOT NULL,
  weightCategory ENUM('63', '68', '73', '78', '85', '95', '105', '105+') NOT NULL,
  kettlebellWeight ENUM('40', '32', '28', '24', '20', '16', '12') NOT NULL,
  PRIMARY KEY (score)
);

CREATE TABLE womenRankingTable (
  score INT NOT NULL,
  ranking ENUM('MSIC', 'MS', 'CMS', 'I', 'II', 'III') NOT NULL,
  eventType ENUM('Jerk', 'Snatch', 'Biathlon', 'Long Cycle') NOT NULL,
  duration ENUM('10min', '5min') NOT NULL,
  weightCategory ENUM('48', '53', '58', '63', '68', '73', '73+') NOT NULL,
  kettlebellWeight ENUM('28', '24', '20', '16', '12', '8') NOT NULL,
  PRIMARY KEY (score)
);

-- MEN Jerk
INSERT INTO menRankingTable (50, 'MSIC', 'Jerk', '10min', '63', '40');
INSERT INTO menRankingTable (40, 'MSIC', 'Jerk', '5min', '63', '40');
INSERT INTO menRankingTable (40, 'MS', 'Jerk', '10min', '63', '40');
INSERT INTO menRankingTable (35, 'MS', 'Jerk', '5min', '63', '40');
INSERT INTO menRankingTable (100, 'MSIC', 'Jerk', '10min', '63', '32');
INSERT INTO menRankingTable (68, 'MSIC', 'Jerk', '5min', '63', '32');
INSERT INTO menRankingTable (68, 'MS', 'Jerk', '10min', '63', '32');
INSERT INTO menRankingTable (50, 'MS', 'Jerk', '5min', '63', '32');
INSERT INTO menRankingTable (30, 'CMS', 'Jerk', '10min', '63', '32');
INSERT INTO menRankingTable (24, 'CMS', 'Jerk', '5min', '63', '32');
INSERT INTO menRankingTable (100, 'MS', 'Jerk', '10min', '63', '28');
INSERT INTO menRankingTable (68, 'MS', 'Jerk', '5min', '63', '28');
INSERT INTO menRankingTable (60, 'CMS', 'Jerk', '10min', '63', '28');
INSERT INTO menRankingTable (48, 'CMS', 'Jerk', '5min', '63', '28');
INSERT INTO menRankingTable (45, 'I', 'Jerk', '10min', '63', '28');
INSERT INTO menRankingTable (35, 'I', 'Jerk', '5min', '63', '28');
INSERT INTO menRankingTable (35, 'II', 'Jerk', '10min', '63', '28');
INSERT INTO menRankingTable (28, 'II', 'Jerk', '5min', '63', '28');
INSERT INTO menRankingTable (20, 'III', 'Jerk', '10min', '63', '28');
INSERT INTO menRankingTable (12, 'III', 'Jerk', '5min', '63', '28');
INSERT INTO menRankingTable (105, 'CMS', 'Jerk', '10min', '63', '24');
INSERT INTO menRankingTable (86, 'CMS', 'Jerk', '5min', '63', '24');
INSERT INTO menRankingTable (75, 'I', 'Jerk', '10min', '63', '24');
INSERT INTO menRankingTable (56, 'I', 'Jerk', '5min', '63', '24');
INSERT INTO menRankingTable (50, 'II', 'Jerk', '10min', '63', '24');
INSERT INTO menRankingTable (40, 'II', 'Jerk', '5min', '63', '24');
INSERT INTO menRankingTable (30, 'III', 'Jerk', '10min', '63', '24');
INSERT INTO menRankingTable (25, 'III', 'Jerk', '5min', '63', '24');
INSERT INTO menRankingTable (130, 'I', 'Jerk', '10min', '63', '20');
INSERT INTO menRankingTable (86, 'I', 'Jerk', '5min', '63', '20');
INSERT INTO menRankingTable (110, 'II', 'Jerk', '10min', '63', '20');
INSERT INTO menRankingTable (56, 'II', 'Jerk', '5min', '63', '20');
INSERT INTO menRankingTable (80, 'III', 'Jerk', '10min', '63', '20');
INSERT INTO menRankingTable (44, 'III', 'Jerk', '5min', '63', '20');
INSERT INTO menRankingTable (150, 'I', 'Jerk', '10min', '63', '16');
INSERT INTO menRankingTable (90, 'I', 'Jerk', '5min', '63', '16');
INSERT INTO menRankingTable (130, 'II', 'Jerk', '10min', '63', '16');
INSERT INTO menRankingTable (80, 'II', 'Jerk', '5min', '63', '16');
INSERT INTO menRankingTable (110, 'III', 'Jerk', '10min', '63', '16');
INSERT INTO menRankingTable (60, 'III', 'Jerk', '5min', '63', '16');
INSERT INTO menRankingTable (68, 'I', 'Jerk', '10min', '63', '12');
INSERT INTO menRankingTable (46, 'I', 'Jerk', '5min', '63', '12');
INSERT INTO menRankingTable (44, 'II', 'Jerk', '10min', '63', '12');
INSERT INTO menRankingTable (36, 'II', 'Jerk', '5min', '63', '12');
INSERT INTO menRankingTable (32, 'III', 'Jerk', '10min', '63', '12');
INSERT INTO menRankingTable (18, 'III', 'Jerk', '5min', '63', '12');
