const express = require ('express');
const app = express();
const cors = require("cors");
 
app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers

const offerRouter = require('./routes/Offers')
app.use("/offers", offerRouter);
 
const ServiceTypeRouter = require('./routes/ServiceTypes')
app.use("/ServiceTypes", ServiceTypeRouter);

const EmployeeRouter = require('./routes/Employees')
app.use("/Employees", EmployeeRouter);

const CustomerRouter = require('./routes/Customers')
app.use("/Customers", CustomerRouter);

const UserRouter = require('./routes/User')
app.use("/User", UserRouter);

const JobRouter = require('./routes/RepairJob')
app.use("/Job", JobRouter);

const QuotationRouter = require('./routes/Quotation')
app.use("/Quotation", QuotationRouter);

const ServiceRouter = require('./routes/Services')
app.use("/Service", ServiceRouter);


       
db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log("server is running on 3001");
    });    
})


