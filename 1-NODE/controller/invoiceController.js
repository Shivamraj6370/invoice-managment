import invoice from '../model/invoiceModel';
import mongoose from 'mongoose';
var fs = require('fs');
import jsPDF from "jspdf";
import "jspdf-autotable"
import { sendmail } from '../midiwear/sendMail';


export const addInvoice = async (req, res) => {
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "cm",
        format: "a4"
    })

    try {
        const { customer_id, phone, email, customerName, status, items, grandtotal } = req.body;
        const invoiceData = new invoice({
            customer_id,
            customerName,
            email,
            status,
            items,
            grandtotal,
            phone
        })
        const auth = await invoiceData.save();


        pdf.setFontSize(18);
        const title = "Invoice Details";
        const headers = [["Sr. No.", "Customer Name", "Status", "Total"]]
        const data = req.body.items.map((data, index) => [
            index + 1,
            req.body.customerName,
            req.body.status,
            req.body.grandtotal,
            req.body.phone
        ]);
        let content = {
            startY: 50,
            theme: "grid",
            head: headers,
            body: data,
        }

        pdf.autoTable(content);
       
        pdf.save("output/Invoice.pdf")
        const arr = auth.items.map((data) => {
            return `<div>
          <table border="1">
            <thead>
              <tr>
                <th>productname</th>
                <th>price</th>
                <th>quantity</th>
                <th>tax%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.productname}</td>
                <td>${data.price}</td>
                <td>${data.quantity}</td>
                <td>${data.tax}</td>
              </tr>
            </tbody>
          </table>
        </div>`
        })
        sendmail(
            'raipriyarani@gmail.com',
            req.body.email,
            `Welcome ${req.body.customerName}`,
            `  
            Status:${req.body.status},
            total amount:${req.body.grandtotal}
            ${arr}`,

        );

        res.send({
            status: true,
            message: "add Successfull",
            result: auth,
        })
    }
    catch (e) {
        console.log(e)
        return res.send({ status: false, message: "error", code: 400, result: e })
    }


}

export const InvoiceList = async (req, res) => {
    try {

        const invicedata = invoice.paginate({},
            {
                //  sort: { customerName: req.body.sort },
                page: req.body.page,
                limit: req.body.limit
            }, (err, result) => {

                res.send({
                    status: 200,
                    message: "geting pasination list ",
                    result: result
                })

            })

    }
    catch (e) {

        return res.send({ status: false, message: "error", code: 400, result: e })
    }
}


export const UpdateInvoice = async (req, res) => {

    try {
        let jsondata = {};


        if (req.body.status) {
            jsondata.status = req.body.status;
        } if (req.body.customerName) {
            jsondata.customerName = req.body.customerName;
        } if (req.body.items) {
            jsondata.items = req.body.items;
        }if (req.body.phone) {
            jsondata.phone = req.body.phone;
        }
        if (req.body.total) {
            jsondata.total = req.body.total;
        }
        invoice.updateOne({ _id: req.body._id },
            { $set: jsondata },
            { new: true },
            (err, updatedlist) => {
                if (err) {
                    res.send({ status: 404, message: "Failed", result: err })
                } else {
                    res.send({ status: true, message: "Updated Successfully", result: updatedlist })
                }
            })
    }
    catch (e) {
        return res.send({ status: false, message: "error", code: 400, result: e })
    }
}


// export const invoiceDelete = async (req,res) => {
//     try{
//         var id = req.params.id;
//         console.log(id)
//           const result =await customer.deleteOne({_id:mongoose.Types.ObjectId(id)})
//             if(result){
//            res.send({status:200,"message":"Deleted",result:result})
//             }
//             else{
//               res.send({status:400,"message":"something went wrong"})
//             }
//     }catch(e){
//         return res.send({ status: false, message: "error", code: 400,result:e })
//     }

// }

//Show invoice By Id
export const getInvoiceDataById = async (req, res) => {
    try {
        const { _id } = req.query;
        console.log(_id);
        const InvoiceData = await invoice.findById(_id);
        console.log(InvoiceData)
        res.send({ status: true, message: "Invoice Data", code: 200, data: InvoiceData })
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}

//delete inoice 
export const deleteinvoice = async (req, res,) => {

    try {
        let _id = req.params.id
        console.log(_id)

        const Customer = await invoice.deleteOne({ _id: mongoose.Types.ObjectId(_id) })
        if (Customer) {
            res.send({
                message: "invoice deleted bro!"
            })
        }

    }
    catch (e) {
        throw e
    }
}



export const getDetailById = async (req, res) => {

    try {
        var _id = req.query._id
        console.log(req.query._id)
        const id = await invoice.findById(_id);

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
