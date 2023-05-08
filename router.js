
const { login, register, verify } = require("./register")

const route = require("express").Router();

route.post("/login",login)
route.post("/reg",register)
route.get("/ver",verify)

module.exports = route 
