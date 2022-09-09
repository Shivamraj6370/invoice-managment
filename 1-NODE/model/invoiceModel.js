import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
const invoiceSchema = new mongoose.Schema({
   
    customerName:{
        type: String,
        
    },customer_id:{
        type: String},
   
    status:{
        type:String,
        
    },
    email:{
        type:String,
       
    },
    items:[{}],
    grandtotal:{
        type:Number,
       
    },phone:{
        type:Number
    }

   
})
invoiceSchema.plugin(paginate);
const invoiceDetails = mongoose.model("invoice", invoiceSchema);
export default invoiceDetails;