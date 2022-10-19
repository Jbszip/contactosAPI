const User = require('../models/user')

//Registro
async function signUpValidations(username, email, password, checkPass, phoneNum) {
  const errors = [];
  const min = /[a-z]/;
  const may = /[A-Z]/;
  const dig = /\d/;
  const onlynum = /^[0-9]/
  const ws = /\s/;
  //Usuario NO registrado
  const usuarioExiste = await User.find({ username: username })
  usuarioExiste.length > 0 ? errors.push("Nombre de usuario ya registrado") : console.log("Username OK")
  //Usuario sin espacios en blanco
  ws.test(username) ? errors.push("Error: El usuario NO puede incluir espacios en blanco") : console.log("Username WS OK");
  //Usuario 4-25 caracteres
  username.length < 26 && username.length > 3 ? console.log("Username length OK") : errors.push("Error: El nombre de usuario debe tener entre 4 y 25 caracteres")
  //Contraseña y repetir contraseña coinciden
  password === checkPass ? console.log("Pass ok") : errors.push("Error: Las contraseñas no concuerdan");
  //Mínimo una minúscula
  min.test(password) ? console.log("Minúsculas OK") : errors.push("Error: La contraseña debe incluir al menos una letra minúscula")
  //Mínimo una mayúscula
  may.test(password) ? console.log("Mayúsculas OK") : errors.push("Error: La contraseña debe incluir al menos una letra mayúscula")
  //Mínimo un número
  dig.test(password) ? console.log("Números OK") : errors.push("Error: La contraseña debe incluir al menos un número")
  //Sin espacios en blanco
  ws.test(password) ? errors.push("Error: La contraseña NO puede incluir espacios en blanco") : console.log("Pass WS OK");
  //Contraseña entre 6 y 20 caracteres
  password.length < 21 && password.length > 5 ? console.log("Length OK") : errors.push("Error: La contraseña debe tener entre 6 y 20 caracteres")
  //Email NO registrado
  const emailExiste = await User.find({ email: email })
  emailExiste.length > 0 ? errors.push("Email ya registrado") : console.log("Email OK")
  //Telefono NO registrado
  const phExiste = await User.find({ phoneNum: phoneNum })
  phExiste.length > 0 ? errors.push("Teléfono ya registrado") : console.log("Username OK")
  if(errors[0] != undefined){
    return {'msg': errors[0]}
  }else{
    return {'msg': 'Test passed'}
  }
}
module.exports = signUpValidations;
