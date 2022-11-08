const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecretKey = require("../../jwtSecretKey");
const jwtConfig = { expiresIn: "3000min" };
const db = require('../../models/index');
const users = db.users;
const bcrypt = require("bcrypt");
const Register = (async (req, res) => {
    console.log(req.body);
    const { email, userName, fullName, passwordFromBody, metaMaskWalletAddress} = req.body;
    console.log(email, userName, fullName, passwordFromBody, metaMaskWalletAddress);
    if ( !email || !userName || !fullName || !passwordFromBody) {
        res.status(422).json({ success: false, message: "Please fill all the fields" })
        return
    }
    users.findOne({ where: { email: email } }).then(async(isUserExist) => {
        console.log("isUserExist line no 18:", isUserExist)
        if (isUserExist) {
            console.log("here if", isUserExist);
            res.status(422).json({ success: false, message: "Email Already Exist" })
            return
        } else {
            const salt = await bcrypt.genSalt(10);
            console.log("password", passwordFromBody);
            const hashedPassword = await bcrypt.hash(passwordFromBody, salt);
            console.log("hashedPassword", hashedPassword);
            users.create({
                email: email,
                user_name: userName,
                full_name: fullName,
                password: hashedPassword,
                
            }).then((resultFromRegisterUser) => {
                if (resultFromRegisterUser) {
                    res.status(200).json({
                        success: true,
                        message: "User register successfully",
                        data: resultFromRegisterUser
                    })
                    return
                } else {
                    res.status(200).json({
                        success: false,
                        message: "resultFromRegisterUser is undefined in else block"
                    })
                }
            }).catch((errWhileFetchingIsUserExist) => {
                console.log("errWhileFetchingIsUserExist:", errWhileFetchingIsUserExist)
                res.status(200).json({
                    success: false,
                    message: "error occurred in creating user",
                    error: errWhileFetchingIsUserExist
                })
            })
        }
    }).catch((errWhileCheckingEmail) => {
        res.status(200).json({
            success: false,
            message: "Error occurs while checking  email is already registered or not",
            error: errWhileCheckingEmail
        })
    })
})
module.exports = Register