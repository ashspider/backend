const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../../jwtSecretKey");
const jwtConfig = { expiresIn: "300min" };
const db = require("../../models/index");
const Users = db.users;


const bcrypt = require("bcrypt");

const Login = (async (req, res, next) => {

    const { emailFromBody, passwordFromBody } = req.body;
    console.log("email and password from body at line no 16:", emailFromBody, passwordFromBody);

    if (emailFromBody === undefined || passwordFromBody === undefined) {
        res.json({ success: false, message: "Email or Password is Undefined" });
        return;
    }

    try {
        // console.log("line 22");
        // console.log("line 23 : ", Users);
        const isUserExist = await Users.findOne({ where: { email: emailFromBody } })
        console.log("line no 26: ", isUserExist);
        if (isUserExist) {
            const user_type = isUserExist.user_type;
            const meta_mask_wallet_address = isUserExist.meta_mask_wallet_address;
            const isPasswordMatching = await bcrypt.compare(passwordFromBody, isUserExist.password)
            console.log("Login Api.js line no 29 : ", isPasswordMatching);
            if (isPasswordMatching) {
                const payload = {
                    userId: isUserExist.id,
                    userType: isUserExist.user_type,
                    metaMaskWalletAddress:isUserExist.meta_mask_wallet_address,
                };
                console.log("line at 34", payload);
                try {
                    const token = jwt.sign(payload, jwtSecretKey, jwtConfig);
                    console.log("token in line no 40",token)
                    console.log("token in line no 41",user_type)
                    console.log("token in line no 42",meta_mask_wallet_address)
                    res.status(200).json({
                        success: true,
                        message: "Login Successfully",
                        data: { token, user_type, meta_mask_wallet_address }
                    });
                    return
                } catch (error) {
                    res.status(400).json({
                        success: false,
                        message: "Error while Creating Token"
                    });
                    return
                }
            } else {
                res.status(400).json({ 
                    success: false, 
                    message: "Please provide valid password" 
                });
                return
            }
        } else {
            res.status(200).json({
                success: false,
                message: "please provide valid email and password"
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = Login;

