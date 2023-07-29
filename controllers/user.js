const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs');

const usuariosGet = (req, res = response) =>{

    const {q, nombre = "No Name", apikey, page = 1, limit} = req.query;
    res.json({
        //ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
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

const usuariosPut = (req, res) =>{
    const {id} = req.params;

    res.json({
        //ok: true,
        msg: 'put API - controlador',
        id: id
    })
}

const usuariosPatch = (req, res) =>{
    res.json({
        //ok: true,
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = (req, res) =>{
    res.json({
        //ok: true,
        msg: 'delete API - controlador'
    })
}

module.exports = {
    usuariosGet, 
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}