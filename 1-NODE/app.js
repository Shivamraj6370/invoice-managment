import express from 'express';
import cors from 'cors'
const app = express();

import { createmongoconnection } from './db'
createmongoconnection();

import customer from './routes/customer'

 import userlogin from './routes/login'
import invoice from './routes/invoice';
import bodyParser from 'body-parser';
app.use(cors({origin:"*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use("/customer", customer);

 app.use("/invoice", invoice);
 app.use("/login", userlogin); 

export default app;