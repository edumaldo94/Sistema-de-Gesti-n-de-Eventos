const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariocontroller');
const authMiddleware = require('../middleware/authMiddleware');
// Registrar un usuario
router.post('/registrar', usuarioController.registrarUsuario);

// Iniciar sesión
router.post('/login', usuarioController.login);

// Obtener el rol de un usuario
router.get('/rol/:idUsuario', usuarioController.obtenerRol);

module.exports = router;