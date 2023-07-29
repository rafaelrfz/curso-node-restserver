const { Router } = require ('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields')
const { isValidRole, emailExists } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe ser más de 6 letras').isLength({min:6}),
        //check('email', 'El correo no es válido').isEmail(),
        check('email').custom(emailExists),
        //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        validateFields
], usuariosPost)
router.put('/:id', usuariosPut)
router.patch('/', usuariosPatch )
router.delete('/', usuariosDelete )



module.exports = router;