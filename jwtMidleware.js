const jwt = require("jsonwebtoken");
const jwtSecretKey = require('./jwtSecretKey');

const verifyToken = (req, res, next) => {
    // console.log("inside verifyToken func",req.files);
    const { authorization } = req.headers;
    console.log("inisde midlleware",authorization);
    if(authorization === undefined) {
        res.status(400).json({
            success : false,
            message : "Error : Invalid Auth Header"
        })
        return;       
    }
     
    const [, token ] = authorization.split(" ");
    console.log("token inside verifyToken func",token);
    try {
        const payload = jwt.verify( token, jwtSecretKey );
        res.auth = payload;
        next();
    } catch (error) {
        res.status(403).json({
            success : false,
            message : "Error while verifying token"
        })
    }
}
module.exports = verifyToken;