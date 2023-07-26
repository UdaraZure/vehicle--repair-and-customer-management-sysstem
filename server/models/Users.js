module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        UserID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
         
        Email:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        Password:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        UserRole: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
 
    // }, {
    //   hooks: {
    //     beforeValidate: (user) => {
    //       // Generate the UserID with the desired format
    //       if (!user.UserID) {
    //         // Find the highest existing UserID
    //         return User.max("UserID")
    //           .then((maxUserID) => {
    //             let nextUserID = "USER001"; // Default UserID if no existing records

    //             if (maxUserID) {
    //               // Increment the numeric part of the highest UserID
    //               const numericPart = parseInt(maxUserID.slice(3), 10);
    //               const nextNumericPart = numericPart + 1;
    //               const paddedNumericPart = nextNumericPart.toString().padStart(3, "0");
    //               nextUserID = `USER${paddedNumericPart}`;
    //             }

    //             user.UserID = nextUserID;
    //           })
    //           .catch((err) => {
    //             // Handle the error appropriately
    //             console.error("Error while generating UserID:", err);
    //           });
    //       }
    //     },
    //   },
    // }
    
    });
    
return User;

};  

