//../models/eventoModel.js
const db = require('../config/db');

//1. Registro de Eventos: Agregar
const Evento = {
    crear: (datosEvento, callback) => {
        const sql = 'INSERT INTO evento (nombre, fecha, ubicacion, descripcion) VALUES (?, ?, ?, ?)';
        db.query(sql, [datosEvento.nombre, datosEvento.fecha, datosEvento.ubicacion, datosEvento.descripcion], callback);
    },

//1. Registro de Eventos: Ver lista de Eventos
    obtenerTodos: callback => {
        const sql = 'SELECT * FROM evento';
        db.query(sql, callback);
    },

//1. Registro de Eventos: Operación de Edición
    actualizar: (id, datosEvento, callback) => {
        const sql = 'UPDATE evento SET nombre = ?, fecha = ?, ubicacion = ?, descripcion = ? WHERE idEvento = ?';
        db.query(sql, [datosEvento.nombre, datosEvento.fecha, datosEvento.ubicacion, datosEvento.descripcion, id], callback);
    },

//1. Registro de Eventos: Operación de Eliminación
    eliminar: (id, callback) => {
        const sql = 'DELETE FROM evento WHERE idEvento = ?';
        db.query(sql, [id], callback);
    },


//2. Visualización de Evento: Lista de Eventos ordenados por Fecha
obtenerEventosPorFecha: callback => {
    const sql = 'SELECT * FROM evento WHERE fecha >= CURDATE() ORDER BY fecha ASC';
    db.query(sql, callback);
},
//2. Visualización de Eventos: Detalles de un Evento
    obtenerPorId: (id, callback) => {
        const sql = 'SELECT e.nombre as Nombre, e.descripcion as Descripción,'+
         'e.ubicacion as Ubicación, e.fecha as Fecha FROM evento e WHERE idEvento = ?';
        db.query(sql, [id], callback);
    }

};

module.exports = Evento;
