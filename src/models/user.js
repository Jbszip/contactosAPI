const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNum:{
        type: Number,
        unique: true
    }
},{
    timestamps: true
})

//Encriptado
UserSchema.methods.encryptPass = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

//Comprobación
UserSchema.methods.checkPass = async (password, hashedPass) => {
    return await bcrypt.compare(password, hashedPass)
}

module.exports = model('User', UserSchema)