'use strict'

import express from 'express';

import path from 'path';

export const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//configurar cabeceras http
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Cargamos una ruta estatica que es la carpeta client
app.use('/',express.static('dist/client',{redirect:false}));

app.get('/api',(req,res)=>{
    res.status(200).send({message:'Bienvenido a Top Floor Marketing'});
});

app.use(require('./routes/index'));

app.get('*',function (req,res,next) {
	res.sendFile(path.resolve('dist/client/index.html'));
	
});

