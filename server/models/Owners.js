module.exports = (sequelize, DataTypes) => {

    const Owners = sequelize.define("Owners", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
                
    }) 
    return Owners;
} 