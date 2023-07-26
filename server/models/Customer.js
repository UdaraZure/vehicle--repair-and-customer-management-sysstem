module.exports = (sequelize, DataTypes) => {

    const Customer = sequelize.define("Customer", {
        CustomerID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
         
        CusName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Address:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        TelNo:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },

        Email:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        NIC:{
            type:DataTypes.STRING,
            allowNull: false,
        },
 
        Password:{
            type:DataTypes.STRING,
            allowNull: false,
        },
 
    }, {
      hooks: {
        beforeValidate: (customer) => {
          // Generate the CustomerID with the desired format
          if (!customer.CustomerID) {
            // Find the highest existing CustomerID
            return Customer.max("CustomerID")
              .then((maxCustomerID) => {
                let nextCustomerID = "CUS001"; // Default CustomerID if no existing records

                if (maxCustomerID) {
                  // Increment the numeric part of the highest CustomerID
                  const numericPart = parseInt(maxCustomerID.slice(3), 10);
                  const nextNumericPart = numericPart + 1;
                  const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
                  nextCustomerID = `CUS${paddedNumericPart}`;
                }

                customer.CustomerID = nextCustomerID;
              })
              .catch((err) => {
                // Handle the error appropriately
                console.error("Error while generating CustomerID:", err);
              });
          }
        },
      },
    });
    
return Customer;

};  

