const db = require('../../../models/index');
const userOrder = db.userOrder;

const UserOrders = (req, res) => {
    const {userID,name,email,price}=req.body;
    if(!userID || !name || !email ||!price){
        res.status(422).json({ success: false, message: "Please fill all the field details correctly" })
        return
    }
    userOrder.create({
        user_id:userID,
        name:name,
        email:email,
        price:price
    }).then((fetchingUserOrders) => {
        res.status(200).json({
            success: true,
            message: "User Order Added Successfully",
            data: fetchingUserOrders
        })
    }).catch((ErrorWhileFetchingUserOrders) => {
        res.status(200).json({
            success: true,
            message: "Error while adding user order",
            data: ErrorWhileFetchingUserOrders
        })
    })
}
module.exports = UserOrders