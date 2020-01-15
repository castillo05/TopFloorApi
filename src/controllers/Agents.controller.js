'use strict'

import db from '../models';
import Agents from '../modelsNoSql/Agent.model';

let getAgents= async (req,res)=>{
    try {
        await db.agents.findAll({}).then(agents=>{
            res.status(200).send({agents:agents});
            agents.forEach(element => {
                // console.log(element.AGENT_CODE);
                Agents.findOne({agentCode:element.AGENT_CODE},(err,resul)=>{
                    if(err) return res.status(500).send({message:err});
    
                    if(!resul){
                       
                         let A = new Agents();
                        A.agentCode=element.AGENT_CODE;
                        A.agentName=element.AGENT_NAME;
                        A.agentCommission=element.COMMISSION
    
                        A.save((err,result)=>{
                            if(err) return res.status(500).send({message:err});
                            console.log(result);
                        });
                    }else{
                        // return console.log({mesagge:'No hay nuevos datos'});
                    }
                });
            });
        }).catch(err=>{ 
            res.status(500).send({message:err});
        });
    } catch (error) {
        console.log(error);
    }
   
}

const getInformationOfAgents=async(req, res)=>{
    try{
        let query = Agents.find();

        await query.exec((err,agents)=>{
                if(err){
                res.status(500).send({message:err});
                }else{
                    res.status(200).send({agents:agents});
                }
            });
    }catch(error){
        console.log(error);
    }
    

}


module.exports={
    getAgents,
    getInformationOfAgents
}