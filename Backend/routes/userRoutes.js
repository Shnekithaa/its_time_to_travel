const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userModel = require('../models/User');
const router = express.Router();

// Validation schemas
const signupSchema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Signup route
router.post("/signup", async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with the given email" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "Invalid User" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
        res.json({ token: token, username:  user.username, email: user.email});
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});

// Update Profile route
router.post("/update-profile", async(req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email})
        if(req.body.bio){
            user.bio = req.body.bio
        }
        if(req.body.gender){
            user.gender = req.body.gender
        }
        await user.save()
        res.status(200).json({message: "Profile updated", user})
    }catch(err){
        res.status(500).json({message: "Failed to update profile", error: err})
    }
})

// Get User Profile Route
router.post("/profile", async(req, res) => {
    console.log(req.body)
    try{
        const user = await userModel.findOne({email: req.body.email})
        console.log(user)
        if(user){
            res.status(200).json({user})
        }
    }catch(err){
        res.status(500).json({message: "Error fetching user data", error: err})
    }
})

module.exports = router;
