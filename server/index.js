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
       
db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log("server is running on 3001");
    });    
})


