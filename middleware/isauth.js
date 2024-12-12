const jwt=require("jsonwebtoken")
const users=require("../model/user")
const user = require("../model/user")
const isauth=async(req,res,next)=>{
    try {
        const token=req.headers.token
        const verify=jwt.verify(token,"abc123")
        console.log(verify);
        
       
            const user=await users.findById(verify.id)
            if(!user){
                res.status(400).send({msg:"user not found"})
            }
        
        else{
            req.user=user
            next()
            
        }
    } catch (error) {
        res.status(500).send({msg:"token invalid",error})
    }
}
module.exports=isauth