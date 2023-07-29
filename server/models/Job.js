module.exports = (sequelize, DataTypes) => {

    const Job = sequelize.define("Job", {
        JobID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        CustomerID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        EmployeeID: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        VehicleNumber: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        JobCreationDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW, // Set the default value to the current date and time
        },

        Status: {
            type: DataTypes.STRING,
            allowNull: true, 
            defaultValue: "New",
        },

        ServiceType: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        JobDescription: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

    },
    {
      hooks: {
        beforeValidate: (job) => {
          // Generate the JobID with the desired format
          if (!job.JobID) {
            // Find the highest existing numeric part of JobID
            return Job.max("JobID").then((maxJobID) => {
              let nextNumericPart = 1; // Default numeric part if no existing records

              if (maxJobID) {
                // Extract the numeric part from the highest JobID and increment it
                const numericPart = parseInt(maxJobID.slice(3), 10);
                nextNumericPart = numericPart + 1;
              }

              const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
              job.JobID = `JOB${paddedNumericPart}`;
            });
          }
        },
      },
      getterMethods: {
        formattedJobID() {
          // Custom getter method to retrieve the formatted JobID
          const numericPart = parseInt(this.JobID.slice(2), 10);
          return `JOB${numericPart.toString().padStart(3, "0")}`;
        },
      },
    });
    
return Job;

};  