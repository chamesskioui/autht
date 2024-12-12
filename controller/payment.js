const stripe=require("stripe")
const secretkey="sk_test_51QUmECAB2pCUArb495U2SnmAe4UwhJ6b7ahvbiqjsmVAgOwbLWwGO03BLKyma5tIDUrlNYuiNxRS32TRSbpG8c5700M2aca0jD"
const Stripe=stripe(secretkey)
const payment=async(req,res)=>{
    try {
        const panier=req.body.panier
        const line_items=panier.map(el=>{
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:el.product.name,
                        description:el.product.discription,
                        images:[el.product.image],
                        metadata:{
                            id:el.product._id
                        }
                    },
                    unit_amount:el.product.price*100
                },quantity:el.quantity 
            }

        })
        const session=await Stripe.checkout.sessions.create({line_items,
            mode:"payment",
            success_url:"http://localhost:4000/successpayment",
            cancel_url:"http://localhost:4000/cancelpayment"
    })
    res.status(200).send({msg:"please click the link",url:session.url})
    } catch (error) {
        res.status(500).send({msg:"failed to create session",error})
    }
}       
const successpayment=async(req,res)=>{
    res.status(200).send({msg:"thank you for your order"})
}
const cancelpayment=async(req,res)=>{
    res.status(500).send({msg:"sorry you need to try again"})
}
module.exports={payment,successpayment,cancelpayment}