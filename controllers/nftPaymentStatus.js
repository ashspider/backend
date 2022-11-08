
const db = require("../models/index");
const buyNft = db.buyNft;


const nftPaymentStatus = (req, res) => {
    console.log("api checking");
    const { nftToken } = req.body;
    console.log("nftToken : ", nftToken);

    buyNft.findOne({
        where: {
            nft_token: nftToken
        }
    }).then((resAfterFindingNft)=>{
        console.log("resAfterFindingNft : ", resAfterFindingNft.id);
        buyNft.update(
          {status : "1"},
          {where:{
            id : resAfterFindingNft.id
          }}
        ).then((resAfterUpdatingStatus)=>{
            console.log("resAfterUpdatingStatus : ", resAfterUpdatingStatus);
            res.status(200).json({
                success : true,
                message : 'Payment for nft successful'
            })
        }).catch((errWhileUpdatingStatus)=>{
            console.log("errWhileUpdatingStatus : ", errWhileUpdatingStatus);
        })
    }).catch((errWhileFindingNft)=>{
        console.log("errWhileFindingNft : ", errWhileFindingNft);
    })
}

module.exports = nftPaymentStatus;