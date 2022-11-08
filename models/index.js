const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize('marketplace', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: { max: 5, min: 0, idle: 10000 }
// })

const sequelize = new Sequelize('marketplace','tambolaphonepay','TambolaPhonePay',{
    host : "tambola.cyibxlzoz8x5.ap-south-1.rds.amazonaws.com",
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 }
})

sequelize.authenticate()
    .then(() => {
        console.log("connected");
    })
    .catch(err => {
        console.log(err);
    })

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize,DataTypes);
db.userOrder = require('./userOrder')(sequelize, DataTypes);
db.userNft = require('./userNft')(sequelize, DataTypes);
db.buyNft = require('./buyNft')(sequelize, DataTypes);



db.users.hasMany(db.userOrder,{foreignKey:'user_id'})
db.userOrder.belongsTo(db.users,{foreignKey:'user_id'})


db.sequelize.sync({ force:false })
.then(() => {
    console.log('resync done')
})

module.exports = db;
