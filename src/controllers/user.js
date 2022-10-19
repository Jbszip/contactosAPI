const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const signUpValidations = require('../validations/signup.js') 

const userController = {}
const {SECRET} = process.env

userController.signup = async (req, res, next)=>{
    const {username, email, password, checkPass, phoneNum} = req.body
    const newUser = new User({username, email, password, phoneNum})
    const resultado = await signUpValidations(username, email, password, checkPass, phoneNum)
    if(resultado.msg !== 'Test passed'){
        res.status(401).send(resultado.msg)
    } else{
        newUser.password = await newUser.encryptPass(password)
        newUser.save()
        res.send('Registro exitoso')
    }
    
}

userController.login = async(req, res, next)=>{
    const {username, password} = req.body
    //Compruebo la existencia del usuario
    const user = await User.findOne({username: username})
    //Verifico la contraseña
    const passwordCorrect = user === null
    ? false
    : await user.checkPass(password, user.password)
    if(!user || !passwordCorrect){
        res.status(401).send('Credenciales Inválidas')
    }else{
        //Genero el token
    const userForToken = user ? {id: user.id, username: user.username} : false
    //Firmo el token
    const token = jwt.sign(userForToken, SECRET,{expiresIn: 60*60*24*7})
    //Devuelvo el token y el username
    const tokenToSend = {'token': token, 'usuario': username}
    res.send(tokenToSend)
    }
    

}

userController.verifyToken = async(req,res,next)=>{
    const {token} = req.body
    try {
        const verificado = await jwt.verify(token, SECRET)
        res.send(verificado.username)
    } catch (error) {
        res.send('Token Invalido')

    }

}

module.exports = userController