const db = require("../models/index");
const buyNft = db.buyNft;


const BuyNft = (req, res) => {
    // res.send("checking")
    const { price, nftToken } = req.body;
    console.log("body : ", req.body);
    buyNft.create({ nft_token:nftToken, price:price }).then((resAfterBuyNft)=>{
        console.log("line no 9", resAfterBuyNft);
        res.status(200).json({
            success : true,
            message : "nft created successfully"
        })
    }).catch((errWhileBuyingNft)=>{
        console.log("errWhileBuyingNft : ", errWhileBuyingNft);
        res.status(400).json({
            success : false,
            message : "error while creating buy nft"
        })
    })
   
}
module.exports = BuyNft;