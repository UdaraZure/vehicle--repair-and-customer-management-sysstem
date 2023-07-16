module.exports = (sequelize, DataTypes) => {

    const clark = sequelize.define("clark", {
        ClarkID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        Role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    
return clark;

};  