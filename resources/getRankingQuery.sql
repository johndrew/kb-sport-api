-- get any rankings
SELECT Ranking
FROM RankingTable
WHERE 
MinimumRepetitions <= 53 AND EventType = 'Long Cycle' AND Duration = '10min' AND WeightCategory = 'Bantamweight' AND KettlebellWeight = 32 AND Gender = 'men';

-- get ranking names
SELECT RankingTypeName
FROM RankingTypes LEFT JOIN RankingTable ON RankingTypes.PriorityWeight = RankingTable.Ranking
WHERE
MinimumRepetitions <= 53 AND EventType = 'Long Cycle' AND Duration = '10min' AND WeightCategory = 'Bantamweight' AND KettlebellWeight = 32 AND Gender = 'men';

-- get highest rank name
SELECT RankingTypeName
FROM RankingTypes LEFT JOIN RankingTable ON RankingTypes.PriorityWeight = RankingTable.Ranking
WHERE MinimumRepetitions <= 53 AND EventType = 'Long Cycle' AND Duration = '10min' AND WeightCategory = 'Bantamweight' AND KettlebellWeight = 32 AND Gender = 'men'
ORDER BY PriorityWeight
LIMIT 1;
