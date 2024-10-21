
//../controllers/participacionController.js
const Participacion = require('../models/participacionModel');

// Registrar participación en un evento
exports.registrarParticipacion = (req, res) => {
    const idUsuario = req.body.idUsuario;  // Cambiado a idUsuario
    const idEvento = req.body.idEvento;

    Participacion.registrar(idUsuario, idEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ message: "Participación registrada con éxito" });
        }
    });
};

// Confirmar asistencia a un evento
exports.confirmarAsistencia = (req, res) => {
    const idUsuario = req.params.idUsuario;  // Cambiado a idUsuario
    const idEvento = req.params.idEvento;    // Se espera idEvento en la URL

    Participacion.confirmarAsistencia(idUsuario, idEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Asistencia confirmada con éxito" });
        }
    });
};



/*// Obtener asistentes confirmados para un evento
exports.obtenerAsistentesConfirmados = (req, res) => {
    const { idEvento } = req.params;

    Participacion.obtenerAsistentesConfirmados(idEvento, (err, participaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(participaciones);
    });
};
*/

// Descargar certificados de asistentes confirmados con detalles
exports.obtenerAsistentesConfirmadosConDetalles = (req, res) => {
    const { idEvento } = req.params;

    Participacion.obtenerAsistentesConfirmadosConDetalles(idEvento, (err, participaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(participaciones);
    });
};

// Obtener asistentes confirmados para un evento
exports.obtenerAsistentesConfirmados = (req, res) => {
    const { idEvento } = req.params;

    Participacion.obtenerAsistentesConfirmados(idEvento, (err, participaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(participaciones);
    });
};


// Eliminar una participación
exports.eliminarParticipacion = (req, res) => {
    const idParticipacion = req.params.id;

    Participacion.eliminar(idParticipacion, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Participación eliminada con éxito" });
        }
    });
};

