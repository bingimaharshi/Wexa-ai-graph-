# CareerGraph AI

CareerGraph AI is a graph-powered career intelligence platform built as a modern React + Vite application. It models career growth as a connected network between users, skills, roles, technologies, companies, and projects so that recommendations are explainable and relationship-driven.

## Overview

The app helps a user:

- see how their current skills map to target job roles
- identify missing skills for a role
- discover the next skill to learn
- compare career paths and transitions
- explore companies and technologies connected to their interests
- reason about role fit through graph-style recommendations

## Why a Graph Database?

Career progression is fundamentally relational. A user’s skills, projects, and certifications connect to technologies, roles, and companies through multi-hop chains such as:

- User -> HAS_SKILL -> Skill -> REQUIRED_BY -> Role
- Skill -> RELATED_TO -> Skill -> REQUIRED_BY -> Role
- Role -> OFFERED_BY -> Company

In a relational database, these questions require repeated joins and complex aggregation logic. In a graph model, the relationship is the data itself. That makes recommendation, skill-gap analysis, career-path discovery, and company matching natural, explainable, and fast to query.

## Core Features

- Dashboard with readiness overview and target roles
- Career role explorer with skill-fit scoring
- Skill explorer with related and paired skills
- Company explorer with role and technology context
- Interactive graph explorer for visual relationship traversal
- Career analysis engine for skill gap discovery and next-skill recommendation
- Personal profile editing with dynamic skill selection

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Lucide React
- react-router-dom
- Recharts (available in app dependencies and suitable for future analytics expansion)

## Project Structure

```text
src/
  App.tsx
  data/
    careerGraphData.ts
  lib/
    careerGraph.ts
  pages/
    LandingPage.tsx
    DashboardPage.tsx
    CareerRolesPage.tsx
    SkillExplorerPage.tsx
    CompanyExplorerPage.tsx
    GraphExplorerPage.tsx
    CareerAnalysisPage.tsx
    ProfilePage.tsx
```

## Running locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the console.

## Build

```bash
npm run build
```

## Design decisions

- The graph is modeled as a lightweight in-memory graph for a front-end proof of concept.
- Each role is scored based on overlap with the user’s selected skills.
- Missing skills are computed directly from role requirements.
- Recommendations prioritize path-based and role-connected skills instead of raw matching alone.
- The experience is polished to feel like a real product demo rather than a hard-coded prototype.

## Future improvements

- Replace the in-memory data with Neo4j/CognoDB with Cypher queries
- Add more realistic seed data and multi-hop analytics
- Add company and role comparison panels
- Add authenticated profiles and saved career graphs
- Integrate a real graph API during backend implementation
