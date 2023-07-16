module.exports = (sequelize, DataTypes) => {

    const employee = sequelize.define("employee", {
        EmpID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        EmpName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        BirthDay:{
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

        Gender:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        Address:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        NIC:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        StartDate:{
            type:DataTypes.DATE,
            allowNull: false,
        },

        Status:{
            type:DataTypes.STRING,
            allowNull: false,
        },

        EndDate:{
            type:DataTypes.DATE,
            allowNull: true,
        },

        UserName:{
            type:DataTypes.STRING,
            allowNull: false,
        }, 

        Password:{
            type:DataTypes.STRING,
            allowNull: false,
        },
 
    });
    
return employee;

};  