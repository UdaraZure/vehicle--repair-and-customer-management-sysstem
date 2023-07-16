module.exports = (sequelize, DataTypes) => {

    const service = sequelize.define("service", {
        serviceID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        ServiceDesrciption: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ServiceDesrciption: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ServicePrice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
return service;

};  