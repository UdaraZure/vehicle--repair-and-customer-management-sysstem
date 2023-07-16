const express = require('express');
const router = express.Router();
const { Owners } = require("../models")
const bcrypt = require("bcrypt"); 

router.post("/", async (req, res) =>{
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Owners.create({
            username: username,
            password: hash,
        });
        res.json("Success");
    })
});