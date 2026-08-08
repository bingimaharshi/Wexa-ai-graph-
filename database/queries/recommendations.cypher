MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(r:Role)
WITH r, COUNT(DISTINCT s) AS matchedCount, COLLECT(DISTINCT s.name) AS matchedSkills
OPTIONAL MATCH (r)-[:REQUIRES]->(required:Skill)
WITH r, matchedCount, matchedSkills, COLLECT(DISTINCT required.name) AS requiredSkills
RETURN r.name AS roleName,
       ROUND((matchedCount * 100.0) / SIZE(requiredSkills)) AS score,
       matchedSkills,
       [skill IN requiredSkills WHERE NOT skill IN matchedSkills] AS missingSkills
ORDER BY score DESC;
