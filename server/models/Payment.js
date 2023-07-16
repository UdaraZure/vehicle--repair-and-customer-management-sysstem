module.exports = (sequelize, DataTypes) => {

    const payment = sequelize.define("payment", {

        PaymentID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        PaymentType: {
            type: DataTypes.STRING,  
            allowNull: false, 
        },

        PaymentAmount: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        PaymentDescription: {
            type: DataTypes.STRING,
            allowNull: false, 
        },  
    });
    
return payment;

};  