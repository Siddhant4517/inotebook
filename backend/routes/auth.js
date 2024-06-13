const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Declaring secret key for token
const JWT_SECRET = '$idClark';

// ROUTE 1: Creating user using: POST /api/auth/createuser endpoint.
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter password of atleast 5 characters').isLength({min: 5})
],async (req,res)=>{
    success = false
    // If there are errors , return Bad status and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try{
        // Check whether a user with email exists already or not
        let user = await User.findOne({email: req.body.email})
        if(user){
            success = false
            return res.status(400).json({success,error: "Sorry a user with this email already exists"})
        }

        //Generating a salt and secPass to secure the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        // Create the user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // Generating user authetication token using json web token
        const data={
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);

        // Sending the auth token to user
        success = true
        res.json({success,authtoken})
    }catch(error){
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a user using:POST /api/auth/login. 
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password should not be empty').exists()
],async (req,res)=>{
    success = false
    // If there are errors , return Bad status and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Fetch the email and password form body
    const {email,password} = req.body;
    try{
        // Find if a user with the entered email is exists from database
        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({ errors:"Please try to login with correct credentials"});
        }

        // Compare the entered password and password from database
        const passwordCompare = await bcrypt.compare(password,user.password);
        // Retrun error if not matched
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, errors:"Please try to login with correct credentials"});
        } 

        // If both credentials are correct then send data
        const data={
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true

        // Sending the auth token to user
       res.json({success,authtoken})
    }catch(error){
        res.status(500).send("Internal Server Error");
        console.log(error);
    }
})

//ROUTE 3: To fetch user data from auth using: POST /api/auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router