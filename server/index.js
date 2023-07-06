const express = require ('express');
const app = express();
const cors = require("cors");
 
app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter);  

const customerRouter = require('./routes/Customers')
app.use("/customers", customerRouter);

const offerRouter = require('./routes/Offers')
app.use("/offers", offerRouter);

db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log("server is running on 3001");
    });    
})


