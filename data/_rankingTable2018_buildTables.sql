CREATE DATABASE rankingTable2018;
USE rankingTable2018;

-- REFERENCE TABLES
CREATE TABLE RankingTypes (
  PriorityWeight INT NOT NULL UNIQUE,
  RankingTypeName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (PriorityWeight)
);
INSERT INTO RankingTypes (PriorityWeight, RankingTypeName) VALUES
(1, 'MSIC'),
(2, 'MS'),
(3, 'CMS'),
(4, 'Rank I'),
(5, 'Rank II'),
(6, 'Rank III');
CREATE TABLE EventTypes (
  EventTypeName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (EventTypeName)
);
INSERT INTO EventTypes (EventTypeName) VALUES
('Jerk'),
('Snatch'),
('Biathlon'),
('Long Cycle');
CREATE TABLE Durations (
  DurationName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (DurationName)
);
INSERT INTO Durations (DurationName) VALUES
('5min'),
('10min');
CREATE TABLE WeightCategories (
  WeightCategoryName VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (WeightCategoryName)
);
INSERT INTO WeightCategories (WeightCategoryName) VALUES
('Strawweight'),
('Flyweight'),
('Bantamweight'),
('Featherweight'),
('Lightweight'),
('Super Lightweight'),
('Welterweight'),
('Super Welterweight'),
('Middleweight'),
('Super Middleweight'),
('Cruiserweight'),
('Heavyweight'),
('Super Heavyweight');
CREATE TABLE KettlebellWeights (
  KettlebellWeight INT NOT NULL UNIQUE,
  PRIMARY KEY (KettleBellWeight)
);
INSERT INTO KettlebellWeights (KettlebellWeight) VALUES
('32'),
('28'),
('24'),
('20'),
('16'),
('12'),
('8');
CREATE TABLE Divisions (
  DivisionName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (DivisionName)
);
INSERT INTO Divisions (DivisionName) VALUES
('PRO'),
('Semi PRO'),
('Amateur'),
('Semi Amateur'),
('Beginners');
CREATE TABLE GenderCategories (
  GenderCategoryName VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (GenderCategoryName)
);
INSERT INTO GenderCategories (GenderCategoryName) VALUES
('men'),
('women');

-- RANKING TABLE
CREATE TABLE RankingTable (
  MinimumRepetitions INT NOT NULL,
  Ranking INT NOT NULL,
  EventType VARCHAR(20) NOT NULL,
  Duration VARCHAR(20) NOT NULL,
  WeightCategory VARCHAR(30) NOT NULL,
  KettlebellWeight INT NOT NULL,
  Division VARCHAR(20) NOT NULL,
  Gender VARCHAR(10) NOT NULL,
  PRIMARY KEY (MinimumRepetitions, Ranking, EventType, Duration, WeightCategory, Gender),
  FOREIGN KEY (Ranking) REFERENCES RankingTypes(PriorityWeight),
  FOREIGN KEY (EventType) REFERENCES EventTypes(EventTypeName),
  FOREIGN KEY (Duration) REFERENCES Durations(DurationName),
  FOREIGN KEY (WeightCategory) REFERENCES WeightCategories(WeightCategoryName),
  FOREIGN KEY (KettlebellWeight) REFERENCES KettlebellWeights(KettlebellWeight),
  FOREIGN KEY (Division) REFERENCES Divisions(DivisionName),
  FOREIGN KEY (Gender) REFERENCES GenderCategories(GenderCategoryName),
  CONSTRAINT CHK_MenWeightCategory CHECK (
    Gender = 'men'
    AND WeightCategory = SOME (
      SELECT WeightCategoryName FROM WeightCategories WHERE (
        WeightCategoryName != 'Strawweight'
        OR WeightCategoryName != 'Flyweight'
        OR WeightCategoryName != 'Super Welterweight'
      )
    )
  ),
  CONSTRAINT CHK_WomenWeightCategory CHECK (
    Gender = 'women'
    AND WeightCategory = SOME (
      SELECT WeightCategoryName FROM WeightCategories WHERE (
        WeightCategoryName != 'Middleweight'
        OR WeightCategoryName != 'Super Middleweight'
        OR WeightCategoryName != 'Cruiserweight'
        OR WeightCategoryName != 'Heavyweight'
        OR WeightCategoryName != 'Super Heavyweight'
      )
    )
  ),
  CONSTRAINT CHK_MenKettlebellWeight CHECK (
    Gender = 'men'
    AND KettleBellWeight = SOME (
      SELECT KettlebellWeight FROM KettlebellWeights WHERE (
        KettlebellWeight != '12'
        OR KettlebellWeight != '8'
      )
    )
  ),
  CONSTRAINT CHK_WomenKettlebellWeight CHECK (
    Gender = 'women'
    AND KettleBellWeight = SOME (
      SELECT KettlebellWeight FROM KettlebellWeights WHERE (
        KettlebellWeight != '32'
        OR KettlebellWeight != '28'
      )
    )
  )
);
