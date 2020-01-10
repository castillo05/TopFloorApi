'use strict'

import mongoose from 'mongoose';

let schema = mongoose.Schema;

let AgentSchema = new schema({
    agentCode: String,
    agentName: String,
    agentCommission: Number
});

module.exports=mongoose.model('Agents', AgentSchema);