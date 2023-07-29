module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define("Offer",
    {
      OfferID: {
        type: DataTypes.STRING,
        allowNull: false,  
        // primaryKey: true,
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
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate: (offer) => {
          // Generate the OfferID with the desired format
          if (!offer.OfferID) {
            // Find the highest existing numeric part of OfferID
            return Offer.max("OfferID").then((maxOfferID) => {
              let nextNumericPart = 1; // Default numeric part if no existing records

              if (maxOfferID) {
                // Extract the numeric part from the highest OfferID and increment it
                const numericPart = parseInt(maxOfferID.slice(2), 10);
                nextNumericPart = numericPart + 1;
              }

              const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
              offer.OfferID = `OF${paddedNumericPart}`;
            });
          }
        },
      },
      getterMethods: {
        formattedOfferID() {
          // Custom getter method to retrieve the formatted OfferID
          const numericPart = parseInt(this.OfferID.slice(2), 10);
          return `OF${numericPart.toString().padStart(3, "0")}`;
        },
      },
    });

  //   Offer.associate = (models) => {
  //     Offer.belongsTo(models.Employee, {
  //       foreignKey: "EmployeeID",
  //       onDelete: "cascade",
  //     });
  // };

  return Offer;
};
