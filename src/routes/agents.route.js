'use strict'
import express from 'express';
import {authorization} from '../middleware/authenticate';

const api = express.Router();

import {getAgents,getInformationOfAgents} from '../controllers/Agents.controller';


api.get('/agents',authorization,getAgents);
api.get('/agentsinformation',authorization,getInformationOfAgents)

module.exports = api;