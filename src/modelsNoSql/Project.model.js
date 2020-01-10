import mongoose from 'mongoose';

let schema=mongoose.Schema;

let ProjectSchema= new schema({
    nameProject: String,
    description: String
});

module.exports=mongoose.model('Project', ProjectSchema);
