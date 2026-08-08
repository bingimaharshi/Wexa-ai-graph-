MATCH (s:Skill)<-[:REQUIRES]-(r:Role)
WITH s, COUNT(DISTINCT r) AS roleCount
RETURN s.name AS skillName, roleCount
ORDER BY roleCount DESC
LIMIT 10; 

MATCH (s:Skill)
WITH COUNT(s) AS skills, COUNT { (s)<-[:REQUIRES]-(:Role) } AS connectedSkills
RETURN skills, connectedSkills; 
