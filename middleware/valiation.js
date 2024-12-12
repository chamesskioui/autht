const {body,validationResult}=require("express-validator")
const { signin, signup } = require("../controller/user")
const signupValidation=[
    body("email","this email is not valid").isEmail(),
    body("password","this password is not strong").isStrongPassword({
        minLength:10,
        minLowercase:1,
        nimNumber:3,
        minUppercase:1,
        minSymbols:1
    })
]        
const signinValidation=[
    body("email","this email is not valid").isEmail(),
]
const validation=(req,res,next)=>{
    try {
        const errors=validationResult(req)
        if(errors.isEmpty()){
            next()
        }
        else{
            res.status(400).send({msg:"invalid password or email",errors:errors.array()})
        }
    } catch (error) {
         res.status(500).send({msg:"error server",error})
    }
}
module.exports={signupValidation,signinValidation,validation}