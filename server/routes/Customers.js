const express = require('express');
const router = express.Router();
const { Customers } = require("../models")
const bcrypt = require("bcrypt"); 
const{ sign } = require("jsonwebtoken");

router.post("/", async (req, res) =>{
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Customers.create({
            username: username,
            password: hash,
        });
        res.json("Success");
    })
});

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Customers.findOne({ where: { username: username } });
  
      if (!user) {
        return res.json({ error: "User doesn't exist" });
      }
  
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return res.json({ error: "Wrong username and password combination" });
        }
        
        const accessToken = sign(
            {username: user.username, id: user.id}, 
            "importantsecret"
        );

        res.json(accessToken
            );
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
 

module.exports = router