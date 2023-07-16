module.exports = (sequelize, DataTypes) => {

    const Offer = sequelize.define("Offer", {

        OfferID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        Title: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
 
        Description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        FromDate:{
            type:DataTypes.DATE,
            allowNull: false,
        },

        TillDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
  
    });
    
return Offer;
 
};  