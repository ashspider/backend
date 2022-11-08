module.exports = (sequelize, DataTypes) => {
    const userNft = sequelize.define('userNft', {        
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
    status : {
        type : DataTypes.STRING(20),
        allowNull: true
    },
     },{
        createdAt : 'created_at',
        updatedAt : 'updated_at'
     })
     return userNft;
 }