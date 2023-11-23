"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom((id) => (0, db_validators_1.existeUsuarioPorId)(id)),
    validar_campos_1.validarCampos
], usuarios_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom((email) => (0, db_validators_1.emailExiste)(email)),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom((id) => (0, db_validators_1.existeUsuarioPorId)(id)),
    (0, express_validator_1.check)('email').custom((email) => (0, db_validators_1.emailExiste)(email)),
    validar_campos_1.validarCampos
], usuarios_1.putUsuario);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom((id) => (0, db_validators_1.existeUsuarioPorId)(id)),
    validar_campos_1.validarCampos
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map