module.exports = (sequelize, DataTypes) => {
  const ServiceType = sequelize.define(
    "ServiceType",
    {
      ServiceTypeID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      STName: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      STDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate: async (serviceType) => {
          // Generate the ServiceTypeID with the desired format
          if (!serviceType.ServiceTypeID) {
            try {
              const highestServiceType = await ServiceType.findOne({
                attributes: [
                  [sequelize.fn("MAX", sequelize.col("ServiceTypeID")), "maxServiceTypeID"],
                ],
              });

              let nextServiceTypeID = "ST001"; // Default ServiceTypeID if no existing records

              if (highestServiceType && highestServiceType.dataValues.maxServiceTypeID) {
                // Increment the numeric part of the highest ServiceTypeID
                const numericPart = parseInt(
                  highestServiceType.dataValues.maxServiceTypeID.slice(2),
                  10
                );
                const nextNumericPart = numericPart + 1;
                const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
                nextServiceTypeID = `ST${paddedNumericPart}`;
              }

              serviceType.ServiceTypeID = nextServiceTypeID;
            } catch (error) {
              console.error("Error generating ServiceTypeID:", error);
              throw new Error("Internal server error");
            }
          }
        },
      },
      getterMethods: {
        formattedServiceTypeID() {
          // Custom getter method to retrieve the formatted ServiceTypeID
          const numericPart = parseInt(this.ServiceTypeID.slice(2), 10);
          return `ST${numericPart.toString().padStart(3, "0")}`;
        },
      },
    }
  ); 

  return ServiceType;
};
