module.exports = (sequelize, DataTypes) => {

    const quotation = sequelize.define("quotation", {

        QuotationID: {
            type: DataTypes.STRING,
            allowNull: false, 
        },

        CreationDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },

        Feedback1:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        Feedback2:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        QuotationStatus:{
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    });
    
return quotation;

};  