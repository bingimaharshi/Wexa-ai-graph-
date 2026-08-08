MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(r:Role)
WITH r, COUNT(DISTINCT s) AS matchedSkillsCount, COLLECT(DISTINCT s.name) AS matchedSkills
OPTIONAL MATCH (r)-[:REQUIRES]->(required:Skill)
WITH r,
     matchedSkillsCount,
     matchedSkills,
     COUNT(DISTINCT required) AS requiredSkillCount,
     COLLECT(DISTINCT required.name) AS requiredSkills
RETURN r.name AS roleName,
       CASE
         WHEN requiredSkillCount = 0 THEN 0
         ELSE ROUND((matchedSkillsCount * 100.0) / requiredSkillCount)
       END AS score,
       matchedSkills,
       requiredSkills,
       requiredSkills - matchedSkills AS missingSkills
ORDER BY score DESC; 
