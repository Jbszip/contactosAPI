const {Schema, model} = require('mongoose')

const ContactSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    phoneNum:{
        type: Number
    },
    description:{
        type: String
    },
    birthday:{
        type: String
    },
    linkedin:{
        type: String
    },
    username:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = model('Contact', ContactSchema)