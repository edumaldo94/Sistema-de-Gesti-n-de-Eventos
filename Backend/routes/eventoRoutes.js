const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const authMiddleware = require('../middleware/authMiddleware');


/*

// Proteger las rutas con authMiddleware
router.post('/crear', authMiddleware(), eventoController.crearEvento);
router.get('/futuros', authMiddleware, eventoController.obtenerEventosFuturos);
*/

router.post('/eve-crear', eventoController.crearEvento); //Status: 200 OK
router.get('/eve-todos', eventoController.obtenerEventos);//Status: 200 OK
router.get('/eve-detalle/:id', eventoController.obtenerEventoPorId);//Status: 200 OK
router.put('/eve-actualizar/:id', eventoController.actualizarEvento);//Status: 200 OK
router.delete('/eve-borrar/:id', eventoController.eliminarEvento);//Status: 200 OK
router.get('/eve-porFecha',authMiddleware(), eventoController.obtenerEventosFuturos);//Status: 200 OK

//authMiddleware([1])= organizador
//authMiddleware([2])= asistente
//authMiddleware()= para cualquier usuario authorizado


module.exports = router;