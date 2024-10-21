const express = require('express');
const router = express.Router();
const participacionController = require('../controllers/participacionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/p-registro', authMiddleware([1]),participacionController.registrarParticipacion);
router.get('/p-certificadopdf/:idEvento/detalles',authMiddleware([1]), participacionController.obtenerAsistentesConfirmadosConDetalles);
router.get('/p-confirmados/:idEvento',authMiddleware([1]), participacionController.obtenerAsistentesConfirmados);
router.put('/p-asistencia/:id',authMiddleware([1]), participacionController.confirmarAsistencia);
router.delete('/p-delet/:id',authMiddleware([1]), participacionController.eliminarParticipacion);

module.exports = router;