'use strict'
import express from 'express';
import {authorization} from '../middleware/authenticate';

const api = express.Router();

import {projectStore, getProjects, getProject, updateProject, deleteProject} from '../controllers/Project.controller';

api.post('/project',authorization, projectStore);
api.get('/projects', authorization,getProjects);
api.get('/project/:id',authorization,getProject);
api.put('/project/:id', authorization, updateProject);
api.delete('/project/:id', authorization, deleteProject)

module.exports = api;