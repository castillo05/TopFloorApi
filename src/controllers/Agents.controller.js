'use strict'

import db from '../models';
import Agents from '../modelsNoSql/Agent.model';

let getAgents=(req,res)=>{
    db.agents.findAll({

    }).then(agents=>{
        res.status(200).send({agents:agents});

        agents.forEach(element => {
            console.log(element.AGENT_CODE);

            Agents.findOne({agentCode:element.AGENT_CODE},(err,resul)=>{
                if(err) return res.status(500).send({message:err});

                if(!resul){
                    console.log({mesagge:'Insertando datos'});
                     let A = new Agents();
                    A.agentCode=element.AGENT_CODE;
                    A.agentName=element.AGENT_NAME;
                    A.agentCommission=element.COMMISSION

                    A.save((err,result)=>{
                        if(err) return res.status(500).send({message:err});

                        console.log(result);
                    });
                }else{
                    return console.log({mesagge:'No hay nuevos datos'});
                }
            });
           
        });
        



    }).catch(err=>{ 
        res.status(500).send({message:err});
    });
}

async function getInformationOfAgents(req, res){

    let query = Agents.find();

   await query.exec((err,agents)=>{
        if(err){
        res.status(500).send({message:err});
        }else{
            res.status(200).send({agents:agents});
        }
    });

}


module.exports={
    getAgents,
    getInformationOfAgents
}