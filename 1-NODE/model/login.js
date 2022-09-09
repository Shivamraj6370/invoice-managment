import mongoose from 'mongoose';
const loginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const loginDetails = mongoose.model("login",loginSchema);
export default loginDetails;