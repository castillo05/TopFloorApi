import mongoose from 'mongoose';
import db from './models';
import {app} from './app';

mongoose.connect('mongodb://topfloor:topfloor05@ds261648.mlab.com:61648/topfloordb',{useNewUrlParser:true,useUnifiedTopology:true},(error, res)=>{
    if (error) return console.log(error);

    app.listen(2000,()=>{
        console.log('Servidor corriendo en el puerto '+2000);
    });
});

db.sequelize.authenticate().then(()=>{
    console.log('Conectado a DB Sql');
});