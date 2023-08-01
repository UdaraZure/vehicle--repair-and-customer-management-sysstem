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
          if (!service.serviceID) {
            const maxService = await sequelize.models.service.findOne({
              attributes: [
                [sequelize.fn("max", sequelize.col("serviceID")), "maxServiceID"], // Change maxserviceID to maxServiceID
              ],
            });
            const maxServiceID = maxService.dataValues.maxServiceID; // Change maxserviceID to maxServiceID
            let nextNumericPart = 1;
            if (maxServiceID) {
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
          const numericPart = parseInt(this.serviceID.slice(3), 10);
          return `SVC${numericPart.toString().padStart(3, "0")}`;
        },
      },
    });
    
return service;

};  