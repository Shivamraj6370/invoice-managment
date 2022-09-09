import express from 'express';
import { userlogin } from '../controller/login';
const router = express.Router();


router.post("/userlogin",userlogin)


export default router;
