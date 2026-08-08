import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';
import healthRoutes from './routes/health.routes.js';
import usersRoutes from './routes/users.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import companiesRoutes from './routes/companies.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import graphRoutes from './routes/graph.routes.js';
import searchRoutes from './routes/search.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'CareerGraph AI API is running',
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/graph', graphRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = env.PORT;

app.listen(port, () => {
  console.log(`CareerGraph AI API running on http://localhost:${port}`);
});
