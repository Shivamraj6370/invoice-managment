import express from 'express'
import {addInvoice,InvoiceList,getInvoiceDataById,deleteinvoice,UpdateInvoice} from '../controller/invoiceController'
const router = express.Router();

router.post("/addInvoice",addInvoice)
router.post("/InvoiceList",InvoiceList)
router.get('/getInvoiceDataById',getInvoiceDataById)
router.put('/UpdateInvoice',UpdateInvoice)

router.delete("/deleteinvoice/:id",deleteinvoice)

export default router;
