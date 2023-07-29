const Role = require('../models/role');
const User = require('../models/user')



const isValidRole = async (role = '')=>{
    const existRole = await Role.findOne({role});
    if(!existRole){
            throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

const emailExists =  async(email = '')=>{
    const isEmail = await User.findOne({email})
    if(isEmail){
        throw new Error(`El correo ${email} ya esta registrado`)
    }   
}

module.exports = {
    isValidRole, emailExists
}