//Import necessary packages
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectDatabase =require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const Pino = require('pino')
// Create a Pino logger instance
const logger = Pino(); 

dotenv.config();

// Create JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
//Implement the /register endpoint 
router.post('/register', async (req, res) => {
    //console.log("Register successfully ")
    //console.log('Request body',req.body)
    try {
        // Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
         const  db = await connectDatabase()
        //  Access MongoDB collection
         const collection = db.collection('users')
        // Check for existing email
         const existingEmail = await collection.findOne({email : req.body.email});
         if(existingEmail){
            logger.error('Email id already exits')
            return res.status(400).json({error: 'Email already exit'})
         }
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
        // Create JWT authentication with user._id as payload
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };
        //created Jwt token
        const authtoken = jwt.sign(payload,JWT_SECRET);
        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});
//login
router.post('/login', async (req, res) => {
    try {
        //  Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectDatabase();
        //  Access MongoDB `users` collection
        const collection = db.collection('users');
        //  Check for user credentials in database
        const theUser = await collection.findOne({email: req.body.email});
        // Check if the password matches the encrypyted password and send appropriate message on mismatch
        if(theUser){
            let result = await bcryptjs.compare(req.body.password , theUser.password);
            if(!result){
                logger.error('passwords do not match')
                return res.status(404).json({error: 'wrong password'})
            }
            // Create JWT authentication if passwords match with user._id as payload
            let payload = {
                user:{
                id: theUser._id.toString(),
            },
        };
        //  Fetch user details from database
        const userName = `${theUser. firstName} ${theUser. lastName}`;
        const userEmail = theUser.email;
         // Create JWT authentication if passwords match with user._id as payload
        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info("user logged in successfully ")
        return res.status(200).json({authtoken,userName,userEmail})
      } else {
        //Send appropriate message if user not found
        logger.error("User not found")
        return res.status(404).json({error:'User not found'})
      };
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});
//Update endpoint
//  Use the `body`,`validationResult` from `express-validator` for input validation

router.put('/update', async (req, res) => {
    //  Validate the input using `validationResult` and return approiate message if there is an error.
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        logger.error('Validation input update',errors.array())
        return res.status(400).json({errors: errors.array()} );
      }
try {
    // Check if `email` is present in the header and throw an appropriate error message if not present.
    const email = req.headers.email;
    if(!email){
        logger.error(`Email not found in the request headers`)
        return res.status(400).json({error:"Email  not found in request headers"});
    }
    //  Connect to MongoDB
    const db = await connectDatabase()
    const collection =  db.collection('Users');


    // Task 5: find user credentials in database
    const existingUser = await collection.findOne({email});
     if(!existingUser){
        logger.error('User not founc')
        return res.status(404).json({error:'User not found' })
     }
    existingUser.firstName = req.body.name;
    existingUser.updatedAt = new Date();

    // Task 6: update user credentials in database
    const updatedUser = await collection.findOneAndUpdate(
        {email},
        {$set: existingUser},
        {returnDocument:'after'},

    );

    // Task 7: create JWT authentication using secret key from .env file
    const payload ={
        user:{
            id: updatedUser._id.toString(),
        },
    };
    const authtoken = jwt.sign(payload, JWT_SECRET);
    logger.info('User updated successfully');
    res.json({authtoken});
} catch (e) {
    logger.error(e);
     return res.status(500).send('Internal server error');

}
});


module.exports = router;