import express from 'express';

const app = express();

app.use(require('./User.route'));
app.use(require('./Project.route'));
app.use(require('./agents.route'));

module.exports=app;