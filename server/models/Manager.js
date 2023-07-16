module.exports = (sequelize, DataTypes) => {

    const manager = sequelize.define("manager", {
        ManagerID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        Role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    
return manager;

};  