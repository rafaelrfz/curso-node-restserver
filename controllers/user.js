const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req, res = response) =>{

    //const {q, nombre = "No Name", apikey, page = 1, limit} = req.query;
    const { limit = 5, since = 0 } = req.query;
    const query =  {status:true}

    // const users = await User.find( query )
    //     .skip((since==Number))
    //     .limit((limit==Number));

    // const total = await User.countDocuments(query);

    const [total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find( query )
        .skip((since==Number))
        .limit((limit==Number))
    ])

    res.json({
        total,
        users
    })
}

const usuariosPost = async (req, res = response) =>{

    //const {nombre, edad} = req.body;
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //Verificar si el correo existe
    //Ya se valida el correo en el helper

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    //Guardar en BD
    await user.save();

    res.json({
        //ok: true,
        //msg: 'post API - controlador',
        user
    })
}

const usuariosPut = async (req, res) =>{

    const {id} = req.params;
    const { _id, password, google, ...rest } = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const userBD = await User.findByIdAndUpdate( id, rest );

    res.json(userBD);
}

const usuariosPatch = (req, res) =>{

    res.json({
        //ok: true,
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = async (req, res) =>{
    const { id } = req.params;

    //Fisicamente lo borramos
    //const user = await User.findByIdAndDelete ( id );

    const user = await User.findByIdAndUpdate(id, {status:false})

    res.json(user)
}

module.exports = {
    usuariosGet, 
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}