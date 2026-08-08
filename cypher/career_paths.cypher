MATCH p = (start:Role {name: $startRole})-[:RELATED_TO*1..4]->(end:Role {name: $endRole})
RETURN [node IN nodes(p) | node.name] AS path, length(p) AS hops
ORDER BY hops ASC
LIMIT 5; 
