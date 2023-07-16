module.exports = (sequelize, DataTypes) => {

    const vehicle = sequelize.define("vehicle", {
        VehicleNumber: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        Type: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        ManuYear: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        Model: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

    // vehicle.associate = (models) => {
    //     vehicle.hasMany(models.vehicles, {
    //         onDelete: "cascade",
    //     });
    // };
    
    
    });
    
return vehicle;

};  