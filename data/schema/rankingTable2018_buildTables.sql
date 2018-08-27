DROP DATABASE IF EXISTS rankingTable2018;
CREATE DATABASE rankingTable2018;
USE rankingTable2018;

-- REFERENCE TABLES
CREATE TABLE RankingTypes (
  PriorityWeight INT NOT NULL UNIQUE,
  RankingTypeName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (PriorityWeight)
);
CREATE TABLE EventTypes (
  EventTypeName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (EventTypeName)
);
CREATE TABLE Durations (
  DurationName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (DurationName)
);
CREATE TABLE WeightCategories (
  WeightCategoryName VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (WeightCategoryName)
);
CREATE TABLE KettlebellWeights (
  KettlebellWeight INT NOT NULL UNIQUE,
  PRIMARY KEY (KettleBellWeight)
);
CREATE TABLE Divisions (
  DivisionName VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (DivisionName)
);
CREATE TABLE GenderCategories (
  GenderCategoryName VARCHAR(10) NOT NULL UNIQUE,
  PRIMARY KEY (GenderCategoryName)
);

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
