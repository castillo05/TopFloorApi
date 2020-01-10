'use strict'
import express from 'express';
import {authorization} from '../middleware/authenticate';

const api = express.Router();

import {singup, singin, getUser, updateUser, deleteUser, verified} from '../controllers/User.controller';

api.post('/singup', singup);
api.post('/singin',singin);
api.get('/user/:id',authorization,getUser);
api.put('/user/:id',authorization,updateUser);
api.delete('/user/:id',authorization,deleteUser);
api.get('/verified/:id',verified);

module.exports = api;