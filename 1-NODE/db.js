import mongoose from "mongoose";
const db = require('./config').get('staging').DB;
console.log(db);

var mongourl =`mongodb://${db.host}:${db.portno}/${db.dbname}`;
console.log(mongourl);

const userdetail = {
    user : db.username,
    pass : db.password
}

export const createmongoconnection = async() => {
    try{
        await mongoose.connect(mongourl,userdetail)
        console.log("connection success");
    }
    catch(e){
        throw e 
    }
}