module.exports = (sequelize, DataTypes) => {
    const quotation = sequelize.define(
      "quotation",
      {
        QuotationID: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        EmployeeID: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        ManagerID: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        JobID: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        Qamount: {
            type: DataTypes.STRING,
            allowNull: false,
          },

        JobDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        CreationDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        Feedback1: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        Feedback2: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        
        QuotationStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeValidate: async (quotation) => {
            // Generate the QuotationID with the desired format
            if (!quotation.QuotationID) {
              // Find the highest existing numeric part of QuotationID
              const maxQuotation = await sequelize.models.quotation.findOne({
                attributes: [
                  [sequelize.fn("max", sequelize.col("QuotationID")), "maxQuotationID"],
                ],
              });
              const maxQuotationID = maxQuotation.dataValues.maxQuotationID;
              let nextNumericPart = 1; // Default numeric part if no existing records
          
              if (maxQuotationID) {
                // Extract the numeric part from the highest QuotationID and increment it
                const numericPart = parseInt(maxQuotationID.slice(3), 10);
                nextNumericPart = numericPart + 1;
              }
          
              const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
              quotation.QuotationID = `QOT${paddedNumericPart}`;
            }
          },
        },
        getterMethods: {
          formattedQuotationID() {
            // Custom getter method to retrieve the formatted QuotationID
            const numericPart = parseInt(this.QuotationID.slice(2), 10);
            return `QOT${numericPart.toString().padStart(3, "0")}`;
          },
        },
      }
    );
  
    return quotation;
  };
  