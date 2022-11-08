const db = require("../../../models/index");
const userNft = db.userNft;
const multer = require('multer');
const path = require('path');

const UserNFT = (req, res) => {
    const { name, price, description } = req.body;
    console.log("req.files : ", req.file);
    console.log("req.body : ", req.body)

    console.log("req.files[index].path : ", req.file.path);
    let result = req.file.path.slice(7);
    let localPathToBeAdded = "http://localhost:4000/"
    let concatedResult = localPathToBeAdded.concat(result);
    console.log("concatedResult of path : ", concatedResult);
    // const {image}=req.file.path;
    // console.log(name, price, description, image);
    userNft.create({
        name: name,
        price: price,
        description: description,
        image: concatedResult,
    }).then((resAfterMarketplace) => {
        console.log("resAfterMarketplace : ", resAfterMarketplace)
        res.status(200).json({
            success: true,
            message: "Market Place Added",
            result: resAfterMarketplace
        })
    }).catch((errWhileResAfterMarketplace) => {
        res.status(200).json({
            success: true,
            message: "Market Place Not Added",
            result: errWhileResAfterMarketplace
        })
    })
}

const GetUserNFT = async (req, res) => {
    userNft.findAll({
        order: [
            ['id', 'DESC'],
        ],
    }).then((getAllMarketplace) => {
        res.status(200).json({
            success: true,
            message: "Marketplace list fetched",
            result: getAllMarketplace
        })
    }).catch((errWhileGetAllMarketplace) => {
        res.status(200).json({
            success: false,
            message: " error while Marketplace data",
        })
    })
}

const GetOneUserNFT = async (req, res) => {
    let id = req.query.id
    userNft.findOne({
        where: { id: id }
    }).then((getAllMarketplace) => {
        res.status(200).json({
            success: true,
            message: "Marketplace list fetched",
            result: getAllMarketplace
        })
    }).catch((errWhileGetAllMarketplace) => {
        res.status(200).json({
            success: false,
            message: " error while Marketplace data",
        })
    })
}

const UpdateUserNFT = async (req, res) => {
    const { name, price, description, image } = req.body;
    let id = req.query.id;
    userNft.update(req.body, {
        where: { id: id },
        name: name,
        price: price,
        description: description,
        image: image,

    }).then((resAfterUpdatingData) => {
        res.status(200).json({
            success: true,
            message: "Marketplace list updated",
            result: resAfterUpdatingData
        })
    }).catch(() => {
        res.status(200).json({
            success: true,
            message: "Marketplace list Not updated",

        })
    })
}


const DeleteUserNFT = async (req, res) => {
    let id = req.query.id
    marketplacedata.destroy({
        where: { id: id }
    }).then((resAfterDeletingData) => {
        res.status(200).json({
            success: true,
            message: "Marketplace list deleted",
            result: resAfterDeletingData
        })
    }).catch(() => {
        res.status(200).json({
            success: true,
            message: "Marketplace list not deleted",
        })
    })
}

module.exports = {
    UserNFT,
    GetUserNFT,
    GetOneUserNFT,
    UpdateUserNFT,
    DeleteUserNFT
}