const express = require('express');
const router = express.Router();
const asistentesController = require('../controllers/asistenteController');

router.get('/a', asistentesController.obtenerAsistentes); //Status: 200 OK
router.post('/a-crear', asistentesController.crearAsistente); //Status: 200 OK
router.get('/a-obtener/:id', asistentesController.obtenerAsistentePorId); //Status: 200 OK
router.put('/a-actualizar/:id', asistentesController.actualizarAsistente); //Status: 200 OK
router.delete('/a-delet/:id', asistentesController.eliminarAsistente); //Status: 200 OK
module.exports = router;

