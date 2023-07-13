module.exports = (sequelize, DataTypes) => {

    const Customers = sequelize.define("Customers", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
                
    }) 
    return Customers;
} 