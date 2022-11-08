const db = require('../../../models/index');
const userOrder = db.userOrder;
const jwt = require("jsonwebtoken");

const GetUserOrders = (req,res) =>{
    const { authorization } = req.headers
    console.log("at line 7", authorization);
    const [, token] = authorization.split(" ");
    console.log(token);
    const payload = jwt.decode(token);
    console.log(payload);
    const userId = payload.userId;
    console.log("at line 13", userId)

    userOrder.findAll({
        where : {user_id : userId},
        include :[
            {
                model:db.users,
                attributes: ['id','user_type','email',"user_name","full_name"]
            },
        ],
        order:[
            ['id', 'DESC'],
        ]
    }).then((fetchingUserOrders)=>{
        res.status(200).json({
            success: true,
            message: "Fetching orders of users successfully",
            data: fetchingUserOrders
        })
    }).catch((ErrorWhileFetchingUserOrders)=>{
        res.status(200).json({
            success: true,
            message: "Error while Fetching orders of users successfully",
            data: ErrorWhileFetchingUserOrders
        })
    })
}
module.exports = GetUserOrders;