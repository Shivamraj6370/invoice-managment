import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})
customerSchema.plugin(paginate);
const customerDetails = mongoose.model("customer",customerSchema);
export default customerDetails;