module.exports = (sequelize, DataTypes) => {

    const Employee = sequelize.define("Employee", {
        EmployeeID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        
        Role:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        EmpName: {
            type: DataTypes.STRING,
            allowNull: true,
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

        Gender:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        BirthDay:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        StartDate:{
            type:DataTypes.DATE,
            allowNull: false,
        },

        EndDate:{
            type:DataTypes.DATE,
            allowNull: true,
        }, 

        Password:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        Status:{ 
            type:DataTypes.STRING,
            allowNull: true,
            defaultValue: "active",
        },
 
    }, {
      hooks: {
        beforeValidate: async (employee) => {
          // Generate the EmployeeID with the desired format if it's not provided
          if (!employee.EmployeeID) {
            // Find the highest existing EmployeeID
            const maxEmployeeID = await Employee.max('EmployeeID');
            let nextEmployeeID = "EMP001"; // Default EmployeeID if no existing records
  
            if (maxEmployeeID) {
              // Increment the numeric part of the highest EmployeeID
              const numericPart = parseInt(maxEmployeeID.slice(3), 10);
              const nextNumericPart = numericPart + 1;
              const paddedNumericPart = nextNumericPart.toString().padStart(3, '0');
              nextEmployeeID = `EMP${paddedNumericPart}`;
            }
  
            employee.EmployeeID = nextEmployeeID;
          }
        }
      },
      // ... (getterMethods and other configurations)
    });
  
    // Employee.associate = (models) => {
    //     Employee.hasMany(models.Offer, {
    //         foreignKey: "EmployeeID",
    //         onDelete: "cascade",
    //     });
    // };
  
    return Employee;
  };