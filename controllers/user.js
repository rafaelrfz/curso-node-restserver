const { response } = require('express')


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

const usuariosPost = (req, res) =>{

    const {nombre, edad} = req.body;

    res.json({
        //ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
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