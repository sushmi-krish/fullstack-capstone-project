//Step 1 - Task 2: Import necessary packages
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectDatabase =require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const Pino = require('pino')
//Step 1 - Task 3: Create a Pino logger instance
const logger = Pino(); 

dotenv.config();

//Step 1 - Task 4: Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
//Implement the /register endpoint 
router.post('/register', async (req, res) => {
    //console.log("Register successfully ")
    //console.log('Request body',req.body)
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
         const  db = await connectDatabase()
        // Task 2: Access MongoDB collection
         const collection = db.collection('users')
        //Task 3: Check for existing email
         const existingEmail = await collection.findOne({email : req.body.email});
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;
       //Task 4: Save user details in database
       const newUser = await collection.insertOne({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password:hash,
        createdAt: new Date()
       })
        //Task 5: Create JWT authentication with user._id as payload
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };
        const authtoken = jwt.sign(payload,JWT_SECRET);
        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

module.exports = router;