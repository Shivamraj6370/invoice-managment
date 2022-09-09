import express from 'express';
import {addcustomer,customerlist,deleteCustomer,UpdateCustomer,countt,getDetailById,customername,DetailById} from '../controller/customer'
import {verfiytoken} from '../midiwear/vtoken'
const router = express.Router();


 router.post("/addcustomer",verfiytoken,addcustomer)
 router.post("/customerlist",verfiytoken,customerlist)
 router.delete("/deleteCustomer/:id",verfiytoken,deleteCustomer)
 router.put("/UpdateCustomer/",verfiytoken,UpdateCustomer)
 router.get("/getDetailById",verfiytoken,getDetailById)
 router.get("/customername",verfiytoken,customername)
 router.get("/DetailById",verfiytoken,DetailById)
 router.get("/countt",verfiytoken,countt)

 

export default router;
