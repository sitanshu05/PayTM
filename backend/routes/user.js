const express = require('express')
const jwt = require('jsonwebtoken');
const {signupBodySchema, signinBodySchema, updateUserInfoSchema} = require("../zodSchema")
const {User,Account} = require("../db");
const { JWT_SECRET } = require('../config');
const {authMiddleware} = require('../middleware')

const router = express.Router()

router.post("/signup",async (req,res)=>{

    if(!signupBodySchema.safeParse(req.body).success || await User.findOne({username : req.body.username})){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }else{
        const user = await User.create(req.body)
        const account = await Account.create({
            userId : user._id,
            balance : Math.random() * 10_000 + 1
        })

        const token = jwt.sign({userId : user._id},JWT_SECRET)

        res.status(200).json({
            message: "User created successfully",
	        token
        })
    }

})

router.post("/signin", async (req,res)=>{

    if(!signinBodySchema.safeParse(req.body).success){
        res.status(411).json({
            message: "Error while logging in"
        })
    }
    const user = await User.findOne(req.body);
    if(!user){
        res.status(411).json({
            message: "Error while logging in"
        })
    }else{

        const token = jwt.sign({userId : user._id},JWT_SECRET);

        res.status(200).json({
            token
        })
    }
})

router.put("/",authMiddleware, async(req,res)=>{

    if(!updateUserInfoSchema.safeParse(req.body).success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id : req.userId},{...req.body})

    res.status(200).json({message: "Updated successfully"})

} )

router.get("/bulk", async(req,res)=>{
    const name = req.query.filter || "";

    const users = await  User.find({
        $or : [
            {firstName: {
                "$regex" : name
            }},
            {lastName : {
                "$regex" : name
            }}
        ]
    })

    res.json({users : users.map((user)=>{
        return {
            username : user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }
    })})
})

module.exports = router

