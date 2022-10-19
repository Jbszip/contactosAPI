const Contact = require("../models/contact");
require("dotenv").config();

const contactController = {};
contactController.createNewContact = async (req, res, next) => {
  const { name, email, phoneNum, description, birthday, linkedin, username } = req.body
  const contactoExiste = await Contact.findOne({name: name})
  if(contactoExiste) {
    res.status(401).send('Error al crear el contacto')
  } else {
    const newContact = new Contact({
      name,
      email,
      phoneNum,
      description,
      birthday,
      linkedin,
      username,
    });
    newContact.save();
    res.send('Creación exitosa')
  }
   
};

contactController.getAllContacts = async (req, res, next)=>{
  const {username} = req.body
  const contactos = await Contact.find({username: username})
  res.send(contactos)
}

contactController.deleteContact = async(req, res, next)=>{
  const {name} = req.body
  try {
    const exito = await Contact.findOneAndDelete({name:name})
    exito ? res.send('Delete exitoso') : res.send('Error al eliminar')
  } catch (error) {
    res.status(401).send('Error al eliminar')
  }

}
module.exports = contactController;
