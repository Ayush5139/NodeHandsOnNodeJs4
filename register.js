const arr = []
const saltround = 10;
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const fs = require("fs")
const jwt = require("jsonwebtoken")

const  register = (req,res) =>{
    const detail = req.body
    console.log(detail)
    const user = arr.find((items)=>{
        return detail.email==items.email // this will return a bollean value and assign to user variable
    })

    if (user){
        return res.status(200).send({msg:"User Already Exists"})
    }
    const hashpass =  bcrypt.hashSync(detail.password,saltround)

    const obj = {
        email:detail.email,
        password: hashpass
    }
    arr.push(obj)
    console.log(arr)
    return res.status(200).send({message:"Student Succesfully Registered"})
}

const login = async (req,res) =>{
    const loginData = req.body
    console.log(loginData)
    const match = arr.find((items)=>{
        if (loginData.email===items.email){
            return items
        }
        else{
            return res.send({message:"User Not Registered"})
        }
    })
    const validate = await bcrypt.compareSync(loginData.password,match.password)
    const secretkey = "qwerty321"
    if (validate){
        const jwttoken = jwt.sign(loginData,secretkey)
        return res.status(200).send({message:"User Has Logged In Successfully",Token:jwttoken})
    }
    else{
        return res.send("Invalid Password.")
    }
}

const verify = (req,res,next)=>{
    const tokennn = req.header("authorization")
    const newToken = tokennn.split(" ")[1]
    // console.log(newToken)
    const secretkey = "qwerty321"
    const verToken = jwt.verify(newToken,secretkey)
    if (tokennn==undefined){
        res.send("Access Granted")
    }
    else{
        res.send("Access Denied")
    }

    next()
}

module.exports = {register,login,verify}