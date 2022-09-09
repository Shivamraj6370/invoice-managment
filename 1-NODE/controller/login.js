
import login from '../model/login';
const jwt = require('jsonwebtoken');

import bcrypt from 'bcryptjs';
export const userlogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await login.findOne({ email });
    if (!user) {
        res.send({
            status: false,
            message: "email not valid"
        })
    }

    const isValid = bcrypt.compareSync(password, user.password);
    let payload = {};
    payload._id = user._id;
    if (isValid) {


        jwt.sign( payload,"shivam", { "expiresIn": "24h" }, (err, token) => {
            res.send({
                status: true,
                message: "login succesful ",
                result: user,
                token: token
            })
        })
       
     }
    else {
        res.send({
            status: false,
            message: "password incorrect"
        });
    }
}