const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


// ROUTE:1 create a user using : POST ("./api/auth/createuser") No login required
router.post('/createuser', [
    body('email', 'Please Enter A Valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 2 })
], async(req, res) => {

    // Any errors return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Cheack weather the user with this email exists already 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "User with this email is already exists!" })
        }

        const salt = await bcrypt.genSalt(10);
        const seqpassword = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: seqpassword,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'DarshanKamble#$@');

        res.send(token)

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    };
})

// ROUTE:2 create a user using : POST ("./api/auth/login") No login required
router.post('/login', [
    body('email', 'Please Enter A Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {

    // Any errors return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        // Cheack weather the user with this email exists already 
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please enter valid credentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ error: "Please enter valid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'DarshanKamble#$@');
        res.send({success:true,token})

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error!")
    }

})

// ROUTE:3 Get loggedin user details using : POST ("./api/auth/getuser") No login required

router.post('/getuser', fetchuser, async(req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})



module.exports = router