const express = require ('express');
const app = express();
const cors = require("cors");
 
app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter);  

const offerRouter = require('./routes/Offers')
app.use("/offers", offerRouter);

const customerRouter = require('./routes/Customers')
app.use("/customers", customerRouter);

const ownerRouter = require('./routes/Owners')
app.use("/owners", customerRouter);

db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log("server is running on 3001");
    });    
})


