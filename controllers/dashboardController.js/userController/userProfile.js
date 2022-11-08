const db = require('../../../models/index');
const users = db.users;

const UserProfile = (req, res) => {
    let id = req.query.id
    users.findOne({
        where: { id: id }
    }).then((fetchingUserProfile) => {
        res.status(200).json({
            success: true,
            message: "User register successfully",
            data: fetchingUserProfile
        })
    }).catch((ErrorWhileFetchingUserProfile) => {
        res.status(200).json({
            success: true,
            message: "User register successfully",
            data: ErrorWhileFetchingUserProfile
        })
    })
}
module.exports = UserProfile