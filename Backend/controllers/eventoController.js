
//../controllers/eventoController.js
const Evento = require('../models/eventoModel');

// Crear un nuevo evento
exports.crearEvento = (req, res) => {
    const datosEvento = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        ubicacion: req.body.ubicacion,
        descripcion: req.body.descripcion
    };
    Evento.crear(datosEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ message: "Evento creado con éxito" });
        }
    });
};

// Obtener todos los eventos
exports.obtenerEventos = (req, res) => {
    Evento.obtenerTodos((err, eventos) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(eventos);
        }
    });
};

// Obtener un evento por ID
exports.obtenerEventoPorId = (req, res) => {
    const idEvento = req.params.id;
    Evento.obtenerPorId(idEvento, (err, evento) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(evento);
        }
    });
};

// Actualizar un evento
exports.actualizarEvento = (req, res) => {
    const idEvento = req.params.id;
    const datosEvento = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        ubicacion: req.body.ubicacion,
        descripcion: req.body.descripcion
    };
    Evento.actualizar(idEvento, datosEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Evento actualizado con éxito" });
        }
    });
};
exports.obtenerEventosFuturos = (req, res) => {
    Evento.obtenerEventosPorFecha((err, eventos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(eventos);
    });
};

// Eliminar un evento
exports.eliminarEvento = (req, res) => {
    const idEvento = req.params.id;
    Evento.eliminar(idEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Evento eliminado con éxito" });
        }
    });
};
