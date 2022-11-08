module.exports = (sequelize, DataTypes) => {
    const marketplacedata = sequelize.define('marketplacedata', {        
     name : {
         type : DataTypes.STRING(200),
         allowNull: false
     },
     price: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    description : {
        type : DataTypes.STRING(200),
        allowNull: false
    },
    image : {
        type : DataTypes.STRING(200),
        allowNull: false
    },
     },{
        createdAt : 'created_at',
        updatedAt : 'updated_at'
     })
     return marketplacedata;
 }