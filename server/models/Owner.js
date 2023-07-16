module.exports = (sequelize, DataTypes) => {

    const owner = sequelize.define("owner", {
        OwnerID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        Role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    
return owner;

};  