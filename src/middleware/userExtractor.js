const jwt = require("jsonwebtoken")
require('dotenv').config()

// Extraigo en un middleware la función que verifica el token
module.exports = (req, res, next) => {
  const authorization = req.get("Authorization")
  const {name, email, phoneNum, description, birthday, linkedin} = req.body

  let token = null
  //Compruebo que el token use bearer
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    //Extraigo el token
    token = authorization.substring(7)
  }
  //Verifico el token
  let decodeToken = {}
  try {
    decodeToken = jwt.verify(token, process.env.SECRET);
    const username = decodeToken.username
    const response = {
      name: name,
      email: email,
      phoneNum: phoneNum,
      description: description,
      birthday: birthday,
      linkedin: linkedin,
      username: username,
    }
    req.body = response
  } catch (error) {
    console.error(error)
  } finally {
    //Compruebo tener token y tener user.id
    if (!token || !decodeToken.username) {
      return res.status(401).json({ error: "invalid token" })
    }
  }
  next()
}