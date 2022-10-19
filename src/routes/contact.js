const { Router } = require("express");
const { createNewContact, getAllContacts, deleteContact } = require("../controllers/contact");
const userExtractor = require("../middleware/userExtractor");

const router = Router();
router.post('/contacts/add', userExtractor, createNewContact)

router.post('/miscontactos', getAllContacts)

router.post('/deletecontact', deleteContact)

module.exports = router;
