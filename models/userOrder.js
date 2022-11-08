module.exports = (sequelize, DataTypes) => {
    const userOrder = sequelize.define('userOrder', {
        user_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return userOrder;
}