/*
    Events Routes
    /api/events
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {isDate} = require('../helpers/isDate');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const router = Router();
//Todas tienen que pasar por la validación de JWT
router.use(validarJWT);

router.get('/', getEventos);
router.post(
    '/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatorio').custom(isDate),
        check('end','La fecha final es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;