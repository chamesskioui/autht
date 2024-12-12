const users = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const valid_email = async (req, res) => {
    try {
        const found = await users.findOne({ email: req.body.email })
        if (found) {
            res.status(400).send({ msg: "user alredy exist" })
        }
        else {
            const secretkey = "abc123"
            const token = jwt.sign({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }, secretkey)
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: "skiouichames61@gmail.com", pass: "bmhp yduv pxas trez" }
            })
            const mailOptions = {
                from: "skiouichames61@gmail.com",
                to: req.body.email,
                subject: "validation de votre compte",
                html: `
            <h1 style="color:red;">Hello ${req.body.name}</h1>
            <p>Please click the link to confirm your subscription</p>
            <a href="http://localhost:4000/register/${token}">click here</a>
            `
            }
            await transporter.sendMail(mailOptions, (error) => {
                if (error) throw error
            })
            res.status(200).send({ msg: "verrify your mail" })
        }
    } catch (error) {
        res.status(500).send({ msg: "failed to send mail" })
    }
}
const signup = async (req, res) => {
    try {
        const tokenemail=req.params.token
        const decode=jwt.verify(tokenemail,"abc123")
        console.log(decode) 
          
        const salt = 10
        const hpassword = bcrypt.hashSync(decode.password,salt)
        console.log(hpassword)
        const user = new users(decode)
        user.password = hpassword
        await user.save()
        const secretkey = "abc123"
        const token = jwt.sign({ id: user._id, name: user.name }, secretkey, { expiresIn: "6d" })
        res.status(200).send({ msg: "account added successfully", user, token })

    } catch (error) {
        res.status(500).send({ msg: "failed to register", error })
    }
}
const signin = async (req, res) => {
    try {
        const found = await users.findOne({ email: req.body.email })
        if (!found) {
            res.status(400).send({ msg: "user not found" })
        }
        else {
            const match = bcrypt.compareSync(req.body.password, found.password)
            if (!match) {
                res.status(400).send({ msg: "password is incorrect" })
            }
            else {
                const secretkey = "abc123"
                const token = jwt.sign({ id: found._id, name: found.name }, secretkey, { expiresIn: "6d" })
                res.status(200).send({ msg: "login successfully", token, user: found })
            }
        }
    } catch (error) {
        res.status(500).send({ msg: "login failed", error })
    }
}
module.exports = { signup, signin, valid_email }