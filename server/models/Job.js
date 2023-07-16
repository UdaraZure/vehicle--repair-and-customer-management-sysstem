module.exports = (sequelize, DataTypes) => {

    const job = sequelize.define("job", {
        JobID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        JobCreationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        Status: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        JobDescription: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

    });
    
return job;

};  