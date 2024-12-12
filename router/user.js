const express=require("express")
const { signup, signin, valid_email } = require("../controller/user")
const { signupValidation, validation } = require("../middleware/valiation")
const isauth = require("../middleware/isauth")
const {payment, successpayment,cancelpayment} = require("../controller/payment")
const userrouter=express.Router()
userrouter.post("/register/:token",signup)
userrouter.post("/email",signupValidation,validation,valid_email)
userrouter.post("/login",signupValidation,validation,signin)
userrouter.post("/payment",payment)
userrouter.get("/successpayment",successpayment)
userrouter.get("cancelpayment",cancelpayment)
userrouter.get("/getcurrent",isauth,async(req,res)=>{
    const user=req.user
    res.status(200).send({msg:"connecting user",user})
})
module.exports=userrouter
