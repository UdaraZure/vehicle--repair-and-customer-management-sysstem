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
      FromDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      TillDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      hooks: {
        beforeValidate: (offer) => {
          // Generate the OfferID with the desired format
          if (!offer.OfferID) {
            // Find the highest existing OfferID
            return Offer.max('OfferID').then((maxOfferID) => {
              let nextOfferID = "OF001"; // Default OfferID if no existing records
  
              if (maxOfferID) {
                // Increment the numeric part of the highest OfferID
                const numericPart = parseInt(maxOfferID.slice(2), 10);
                const nextNumericPart = numericPart + 1;
                const paddedNumericPart = nextNumericPart.toString().padStart(3, '0');
                nextOfferID = `OF${paddedNumericPart}`;
              }
  
              offer.OfferID = nextOfferID;
            });
          }
        }
      }, 
      getterMethods: {
        formattedOfferID() {
          // Custom getter method to retrieve the formatted OfferID
          const numericPart = parseInt(this.OfferID.slice(2), 10);
          return `OF${numericPart.toString().padStart(3, '0')}`;
        }
      }
    });
  
    return Offer;
  };
   