module.exports = (sequelize, DataTypes) => {

    const ServiceType = sequelize.define("ServiceType", {
        ServiceTypeID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        STName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        STDesrciption: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    });
    
return ServiceType;

};  