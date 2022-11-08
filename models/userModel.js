module.exports = (sequelize,DataTypes)=>{
   const users = sequelize.define('users',{
    user_type : {
        type : DataTypes.STRING,
        allowNull: true
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    user_name : {
        type : DataTypes.STRING,
        allowNull: false
    },
    full_name : {
        type : DataTypes.STRING,
        allowNull: false
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false
    },
    meta_mask_wallet_address :{
        type : DataTypes.STRING,
        allowNull: true
    }
   }) 
   return users;
}