import {Router} from 'express';
import {check} from 'express-validator';

import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuarios';
import {emailExiste, existeUsuarioPorId} from '../helpers/db-validators';
import { validarCampos } from '../middlewares/validar-campos';

const router= Router();


router.get('/',getUsuarios);
router.get('/:id',[
    check('id').custom((id)=>existeUsuarioPorId(id)),
    validarCampos
],getUsuario);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom((email) => emailExiste(email)),
    validarCampos
],
postUsuario);
router.put('/:id',[
    check('id').custom((id)=>existeUsuarioPorId(id)),
    check('email').custom((email) => emailExiste(email)),
    validarCampos
],putUsuario);
router.delete('/:id',[
    check('id').custom((id)=>existeUsuarioPorId(id)),
    validarCampos
],deleteUsuario);

 
export default router;