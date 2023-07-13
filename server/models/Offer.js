module.exports = (sequelize, DataTypes) => {

    const Offer = sequelize.define("Offer", {
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        username:{
            type:DataTypes.STRING,
            allowNull: false,
        },
  
    // Offer.associate = (models) => {
    //     Offer.hasMany(models.Offers, {
    //         onDelete: "cascade",
    //     });
    // };
    
    
    });
    
return Offer;

};  