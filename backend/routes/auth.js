const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


// create a user using : POST ("./api/auth") Doesn't require auth
router.post('/', [
    body('email', 'Please Enter A Valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 2 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user));

    // res.send(req.body)
})

module.exports = router