# CareerGraph AI Architecture

## Overview

CareerGraph AI is designed around the idea that career growth is a graph problem. A user has skills, experiences, projects, certifications, and target roles, and those entities are strongly connected to companies, technologies, and industries.

## Core graph structure

- User to Skill via `HAS_SKILL`
- User to Project via `BUILT`
- User to Role via `TARGETS`
- Role to Skill via `REQUIRES`
- Skill to Skill via `RELATED_TO` and `PREREQUISITE_OF`
- Company to Role via `OFFERS`
- Project to Technology via `USES`
- Project to Skill via `DEMONSTRATES`
- Certification to Skill via `VALIDATES`

## Graph-first value

Graph traversal is the product. It gives us:

- role fit scoring using multi-hop relationships
- skill gap discovery against target roles
- career transition pathways between adjacent roles
- company matching from a user's skill profile
- explainable recommendations using direct graph connections

## Recommended backend pattern

The app should separate concerns into:

- controllers / routes
- services
- repositories
- seed / graph bootstrap
- query definitions in `cypher/`

## Frontend pattern

The React client consumes the graph API and renders:

- dashboard cards
- role and skill explorers
- graph explorer UI
- analysis and profile pages

## Future database integration

This front-end implementation is graph-first and data-driven, but the final production version should connect to CognoDB / Neo4j with parameterized Cypher queries so that the same logic can run server-side with real graph persistence.
