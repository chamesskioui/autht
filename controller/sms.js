const express = require('express')
const bodyParser = require('body- parser')
const Twilio = require('twilio')
const twilioAccountSid = "AC8bdc4abc39c047d399da3421a34d73b6"
const twilioAuthToken = "7b801ad344311488f6ea378ab8ac39c7"
const twilioPhoneNumber = "+1234567890"
const app=express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken)
app.post('/sendMessage', (req, res)=> {
    const { phoneNumber, message } = req.body
    twilioClient.messages.create({ 
        body: message, 
        from: twilioPhoneNumber, 
        to: phoneNumber 
})
        .then((message) => {
            console.log("Message sent.", message.sid)
            res.status(200).send("Message sent.")
        .catch((error) => {
            console.error('Error sending message',error)
            res.status(500).send({msg:"Failed to send message",error})
        })
})})





