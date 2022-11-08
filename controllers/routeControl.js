const express = require("express");
const app = express();
const router = express.Router();
const multer = require('multer')

const { UserNFT, GetUserNFT, GetOneUserNFT, UpdateUserNFT, DeleteUserNFT } = require('./dashboardController.js/userController/UserNFTDetails');
var fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("is working")
        console.log("top gaya : ", file);
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log("bottom gaya : ", file);
        cb(null, Date.now() + "__" + file.originalname)
    }
})
var upload = multer({ storage: fileStorageEngine })
router.post("/marketplace",upload.single("image"), UserNFT);
router.get("/get-all-marketplace", GetUserNFT)
router.get("/get-one-marketplace", GetOneUserNFT)
router.put("/update-marketplace", UpdateUserNFT)
router.delete("/delete-marketplace", DeleteUserNFT)
// router.post("/post/articles", upload.fields([{ name: 'all_files', maxCount: 5 }]), UploadArticles);




const Register = require('./authController/registration')
const Login = require('./authController/login')
const ForgotPassword = require('./authController/forgotPassword')
const UserProfile = require('./dashboardController.js/userController/userProfile')
const UserOrders = require('./dashboardController.js/userController/userOrder')
const GetUserOrders = require('./dashboardController.js/userController/getUserOrder')
const BuyNft = require("./buyNftControllers")
const nftPaymentStatus = require("./nftPaymentStatus");

//Auth Routes
router.post('/registration', Register)
router.post('/login', Login)
router.post('/forgot-password', ForgotPassword)

//dashboard Routes
router.get('/user-profile', UserProfile)
router.post('/user-orders', UserOrders)
router.get('/get-user-orders', GetUserOrders)
router.post("/update/payment/nft", nftPaymentStatus);

router.post('/Buy-NFT',BuyNft)

module.exports = router;