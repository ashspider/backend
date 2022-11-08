const db = require("../models/index");
const marketplacedata = db.marketplacedata;
const multer = require('multer');
const path = require('path');

const Marketplace = (req, res) => {
    const { name, price, description, image } = req.body;
    // const {image}=req.file.path;
    console.log(name, price, description, image);
    marketplacedata.create({
        name: name,
        price: price,
        description: description,
        image: image,
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

const GetAllMarketplace = async (req, res) => {
    marketplacedata.findAll({
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

const GetOneMarketplace = async (req, res) => {
    let id = req.query.id
    marketplacedata.findOne({
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

const UpdateMarketplace = async (req, res) => {
    const { name, price, description, image } = req.body;
    let id = req.query.id;
    marketplacedata.update(req.body, {
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


const DeleteMarketplace = async (req, res) => {
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
    Marketplace,
    GetAllMarketplace,
    GetOneMarketplace,
    UpdateMarketplace,
    DeleteMarketplace
}