MATCH (u:User {id: $userId})-[:HAS_SKILL]->(:Skill)<-[:REQUIRES]-(role:Role)-[:OFFERS]->(company:Company)
RETURN u.name AS userName, role.name AS roleName, company.name AS companyName
ORDER BY role.name, company.name; 
