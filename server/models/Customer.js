module.exports = (sequelize, DataTypes) => {

    const Customer = sequelize.define("Customer", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
                
    });


    Customer.associate = (models) => {
        Customer.hasMany(models.Posts, {
            onDelete: "cascade",
        });
    };
    
    return Customer
};