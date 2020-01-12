import mongoose from 'mongoose';
import db from './models';
import {app} from './app';
require('dotenv').config();

var port = process.env.PORT; 

mongoose.connect('mongodb://topfloor:topfloor05@ds261648.mlab.com:61648/topfloordb',{useNewUrlParser:true,useUnifiedTopology:true},(error, res)=>{
    if (error) return console.log(error);

    app.listen(port,()=>{
        console.log('Servidor corriendo en el puerto '+port);
    });
});

db.sequelize.authenticate().then(()=>{
    console.log('Conectado a DB Sql');
});