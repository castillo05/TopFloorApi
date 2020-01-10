'use strict'

import mongoose from 'mongoose';

let schema = mongoose.Schema;

let UserSchema = new schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    verified:Boolean
});

module.exports=mongoose.model('User', UserSchema);