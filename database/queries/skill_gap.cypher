MATCH (u:User {id: $userId})-[:TARGETS]->(target:Role {name: $roleName})
OPTIONAL MATCH (target)-[:REQUIRES]->(required:Skill)
OPTIONAL MATCH (u)-[:HAS_SKILL]->(owned:Skill)
WITH target, required, owned
WITH target,
     COLLECT(DISTINCT required.name) AS requiredSkills,
     COLLECT(DISTINCT owned.name) AS userSkills
RETURN target.name AS roleName,
       [skill IN requiredSkills WHERE NOT skill IN userSkills] AS missingSkills,
       [skill IN requiredSkills WHERE skill IN userSkills] AS matchedSkills,
       ROUND((SIZE([skill IN requiredSkills WHERE skill IN userSkills]) * 100.0) / SIZE(requiredSkills)) AS readiness;
