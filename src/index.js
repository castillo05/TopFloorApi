import mongoose from 'mongoose';
import db from './models';
import {app, server} from './app';
require('dotenv').config();


const io = require('socket.io')(server);

var port = process.env.PORT;

io.on('connection', (socket) => {
    console.log('Conexion id: '+socket.id);
});
server.listen(port);


mongoose.connect('mongodb://topfloor:topfloor05@ds261648.mlab.com:61648/topfloordb',{useNewUrlParser:true,useUnifiedTopology:true},(error, res)=>{
    if (error) return console.log(error);
});

db.sequelize.authenticate().then(()=>{
    console.log('Conectado a DB Sql');
});