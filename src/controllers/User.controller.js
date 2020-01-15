'use strict'

import User from '../modelsNoSql/User.model';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import email from '../services/email.service';

let singup = (req, res)=>{
    let U = new User();

    const saltRound=1;

    U.firstName=req.body.firstName;
    U.lastName=req.body.lastName;
    U.email=req.body.email;

    let searchUser=User.find({email:req.body.email.toLowerCase()}).sort();

    searchUser.exec((err,user)=>{
        if(err) return res.status(500).send({message:err});

        if(user.length >= 1){
            res.status(200).send({message:'Este email ya existe'});
        }else{
            if(req.body.password){
                bcrypt.hash(req.body.password, saltRound,(err,hash)=>{
                    if(err) return console.log(err);

                    U.password=hash;

                    U.save((err, singup)=>{
                        if(err) return console.log(err);

                        if(!singup){
                            res.status(500).send({message:'Problemas en el registro de usuario'})
                        }else{
                            res.status(200).send({user:singup,message:'Hemos enviado un email de verificación'});
                            email.email(req.body.email,req.body.firstName+' '+req.body.lastName,singup._id);
                        } 
                    });
                });
            }else{
                return res.status(500).send({message:'Introduzca la contraseña'});
            }
        }
    });
}

let singin = (req, res)=>{
    let email=req.body.email;

    let searchUser = User.findOne({email:email.toLowerCase()});

    let searchVerified= User.findOne({email:email.toLowerCase()});

    searchVerified.exec((err,user)=>{
        if(!user){
            res.status(500).send({message:'Estos datos no existen'});
        }else if(user.verified){
                    searchUser.exec((err, user)=>{
                if(err) return res.status(500).send({message:err});

                if(!user){
                    res.status(200).send({message:'Este correo electronico no esta registrado'});
                }else{
                    if(!req.body.password) return res.status(200).send({message:'Introduzca la contraseña'});
                    
                    bcrypt.compare(req.body.password,user.password,(err, check)=>{
                        if(err){
                            console.log(err)
                        }else{
                            if(!check) return res.status(200).send({message:'Contraseña Incorrecta'});

                            let token = jsonwebtoken.sign({
                                user:user
                            },'Top-Floor-Secret',{expiresIn:60*60});
                            if(req.body.gethash){
                                res.status(200).send({token:token});
                            }else{
                                res.status(200).send({user:user});
                            }
                            
                        } 
                    });
                    
                }
            });
        }else{
            res.status(401).send({message:'Esta cuenta no esta verificada'});
        }
    });

    
}

let getUser=(req, res)=>{
    let id = req.params.id;

    User.findById(id,(err,user)=>{
        if(err) return console.log(err);

        if(!user){
            res.status(200).send({message:'Este usuario no existe'});
        }else{
            res.status(200).send({user:user});
        }
    });
}

let updateUser=(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    User.findByIdAndUpdate(id,data,(err,user)=>{
      if(err) return console.log(err);
  
      if(!user){
        res.status(200).send({
          message: 'Este usuario no existe'
        });
      }else{
        res.status(200).send({user:user});
      }
    });
  }

  let deleteUser=(req, res)=>{

    let id = req.params.id;

    User.findByIdAndRemove(id,(err,message)=>{
        if(err) return console.log(err);
  
        if(!message){
          res.status(200).send({
            message: 'Este usuario no existe'
          });
        }else{
          res.status(200).send({message:'Usuario Eliminado con exito!'});
        }
    });
  }

  let verified=(req,res)=>{
      let id=req.params.id;

      let search=User.findById(id);
    
      search.exec((err,user)=>{
          if(user.verified) return res.status(401).send({message:'Tu cuenta ya esta verificada'});

          User.findByIdAndUpdate(id,{verified:1},(err,verified)=>{
            if(err) return res.status(500).send({message:err});
    
            res.redirect('https://gentle-shelf-08563.herokuapp.com/login');
          });


      });

      
  }

module.exports={
    singup,
    singin,
    getUser,
    updateUser,
    deleteUser,
    verified
}
