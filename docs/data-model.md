# Data Model

## Node types

- User
- Skill
- Role
- Company
- Technology
- Project
- Certification
- Course
- Industry
- Location

## Relationship patterns

- (:User)-[:HAS_SKILL]->(:Skill)
- (:User)-[:TARGETS]->(:Role)
- (:User)-[:BUILT]->(:Project)
- (:Role)-[:REQUIRES]->(:Skill)
- (:Skill)-[:RELATED_TO]->(:Skill)
- (:Skill)-[:PREREQUISITE_OF]->(:Skill)
- (:Company)-[:OFFERS]->(:Role)
- (:Company)-[:LOOKS_FOR]->(:Skill)
- (:Project)-[:DEMONSTRATES]->(:Skill)
- (:Certification)-[:VALIDATES]->(:Skill)
- (:Role)-[:USES]->(:Technology)

## Example graph questions

- Which roles match my skill profile?
- Which missing skill unlocks the most roles?
- Which companies hire for roles aligned with my skills?
- Which role transition is the shortest path from my current role to my target role?

## Why this model works

It turns career planning into a navigation problem across connected entities rather than a set of disconnected records. That is exactly the type of domain a graph database is built to serve.
