module.exports = (sequelize, DataTypes) => {
    const buyNft = sequelize.define('buyNft', {        
     nft_token : {
         type : DataTypes.STRING(200),
         allowNull: false
     },
     price: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("0", "1")
    },
     },{
        createdAt : 'created_at',
        updatedAt : 'updated_at'
     })
     return buyNft;
 }