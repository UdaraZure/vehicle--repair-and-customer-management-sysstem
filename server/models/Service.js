module.exports = (sequelize, DataTypes) => {

    const service = sequelize.define("service", {
        serviceID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        JobID: {
            type: DataTypes.STRING,
        },

        QuotationID: {
            type: DataTypes.STRING,
        },

        ServiceTypeID: {
            type: DataTypes.STRING,
        },

        ServiceDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ServicePrice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        hooks: {
          beforeValidate: async (service) => {
            // Generate the ServiceID with the desired format
            if (!service.serviceID) {
              // Find the highest existing numeric part of ServiceID
              const maxService = await sequelize.models.service.findOne({
                attributes: [
                  [sequelize.fn("max", sequelize.col("ServiceID")), "maxServiceID"],
                ],
              });
              const maxServiceID = maxService.dataValues.maxserviceID;
              let nextNumericPart = 1; // Default numeric part if no existing records
          
              if (maxServiceID) {
                // Extract the numeric part from the highest ServiceID and increment it
                const numericPart = parseInt(maxServiceID.slice(3), 10);
                nextNumericPart = numericPart + 1;
              }
          
              const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
              service.serviceID = `SVC${paddedNumericPart}`;
            }
          },
        },
        getterMethods: {
          formattedServiceID() {
            // Custom getter method to retrieve the formatted ServiceID
            const numericPart = parseInt(this.serviceID.slice(2), 10);
            return `SVC${numericPart.toString().padStart(3, "0")}`;
          },
        },
      });
    
return service;

};  