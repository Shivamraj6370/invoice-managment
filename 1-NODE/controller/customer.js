import customer from '../model/Customer'
import mongoose from 'mongoose';
import invoice from '../model/invoiceModel'



export const addcustomer= async (req, res) => {
    const customerData = new customer({
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone
    

    })
    const customerDetails = await customerData.save();
    try {
        res.send({
            status: 200,
            message: "customer add successfull",
            result: customerDetails
        })
    }
    catch (e) {
        throw e
    }
}

export const customerlist = async (req, res) => {
    try {
        const invicedata = customer.paginate({},
            {
                //  sort: { customerName: req.body.sort },
                page: req.body.page,
                limit:req.body.limit
            },(err, result) => {

                res.send({
                    status: 200,
                    message: "geting pasination list ",
                    result: result
                })

            })

    }
    catch (e) {
        throw e

    }
}



export const deleteCustomer = async (req, res,) => {

    try {
        let _id = req.params.id
        console.log(_id)
        
        const Customer = await customer.deleteOne({ _id: mongoose.Types.ObjectId(_id) })
         if(Customer){
            res.send({
                message:"document deleted bro!"
            })
         }
                
    }
    catch (e) {
        throw e
    }
}


//updates
export const UpdateCustomer = async (req, res) => {

    try {
        let jsondata = {};

        if (req.body.name) {
            jsondata.name = req.body.name;
        }
        if (req.body.email) {
            jsondata.email = req.body.email;
        }
        if (req.body.phone) {
            jsondata.phone = req.body.phone;
        }
       

        customer.updateOne({ _id: req.body._id },
            { $set: jsondata },
            { new: true },
            (err, updatedlist) => {
                if (err) {
                    res.send({
                        status: 404,
                        message: "Failed",
                        result: err
                    })
                } else {
                    res.send({
                        status: 200,
                        message: "Updated Successfully",
                        result: updatedlist
                    })
                    console.log(updatedlist)
                }
            })
    }
    catch (e) {
        throw e
    }
}

export const getDetailById = async (req, res) => {

    try {
        var _id = req.query._id
        const id = await customer.findById(_id);
        console.log(id)
        res.send({
            status: true,
            message: "user id grting successfully",
            result: id
        })
    }
    catch (e) {
        return res.send({
            status: false,
            message: "error",
            result: e
        })
    }

}
export const customername = async (req, res) => {
    try {
        const customerdata = await customer.find();
        res.send({
            status: 200,
            message: "customer list geting successfully",
            result: customerdata
        })

    }
    catch (e) {
        throw e

    }
}
export const DetailById = async (req, res) => {

    try {
        var _id = req.query._id
        const id = await customer.findById(_id);
        console.log(id)
        res.send({
            status: true,
            message: "user id grting successfully",
            result: id
        })
    }
    catch (e) {
        return res.send({
            status: false,
            message: "error",
            result: e
        })
    }

}


export const countt = async (req, res) => {
    try {
        
        const estimate = await customer.estimatedDocumentCount();
        const estimate1 = await invoice.estimatedDocumentCount();
        const countpaid = await invoice.countDocuments({ status: "Paid" });
        const countunpaid = await invoice.countDocuments({ status: "Unpaid" });
       console.log("countpaid",countpaid)
       console.log("countunpaid",countunpaid)
       
       
       
        res.send({
             status: 200, 
             message: "Invoice List",
              result: estimate,
              data:estimate1,
            paid:countpaid,
            unpaid:countunpaid

         })
    }
    catch (e) {
        return res.send({ status: false, message: "error", code: 400,result:e })
    }
}



export const getCustomerDataById = async (req, res) => {
    try {
        const { _id } = req.query;
        console.log(_id);
        const customerData = await customer.findById(_id);
        console.log(customerData)
        res.send({ status: true, message: "customer Data", code: 200, data: customerData })
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}
