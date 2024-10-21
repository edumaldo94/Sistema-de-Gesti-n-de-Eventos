//../models/participacionModel.js

const db = require('../config/db');

const Participacion = {
// Registrar la participación de un usuario en un evento
    registrar: (idUsuario, idEvento, callback) => {
        const sql = 'INSERT INTO participacion (idUsuario, idEvento, confirmacion) VALUES (?, ?, 0)';
        db.query(sql, [idUsuario, idEvento], callback);
    },

// Confirmar la asistencia de un usuario
    confirmarAsistencia: (idUsuario, idEvento, callback) => {
        const sql = 'UPDATE participacion SET confirmacion = 1 WHERE idUsuario = ? AND idEvento = ?';
        db.query(sql, [idUsuario, idEvento], callback);
    },

// Obtener asistentes confirmados con detalles (nombre, email, evento)
    obtenerAsistentesConfirmadosConDetalles: (idEvento, callback) => {
        const sql = `
            SELECT u.nombre, u.email, e.nombre AS evento, e.fecha
            FROM usuarios u
            JOIN participacion p ON u.idUsuario = p.idUsuario
            JOIN evento e ON p.idEvento = e.idEvento
            WHERE p.confirmacion = 1 AND p.idEvento = ?`;
        db.query(sql, [idEvento], callback);
    },

// Obtener lista de asistentes confirmados
    obtenerAsistentesConfirmados: (idEvento, callback) => {
        const sql = `
            SELECT u.nombre, u.email
            FROM usuarios u
            JOIN participacion p ON u.idUsuario = p.idUsuario
            WHERE p.idEvento = ? AND p.confirmacion = 1`;
        db.query(sql, [idEvento], callback);
    },

// Eliminar una participación
    eliminar: (idParticipacion, callback) => {
        const sql = 'DELETE FROM participacion WHERE idParticipacion = ?';
        db.query(sql, [idParticipacion], callback);
    }
};

module.exports = Participacion;






/*const db = require('../config/db');

const Participacion = {
//2 Registro de Asistentes:Registrar la participación de un usuario en un evento Status: 200 OK
    registrar: (idAsistente, idEvento, callback) => {
        const sql = 'INSERT INTO participacion (idAsistente, idEvento, confirmacion) VALUES (?, ?, 0)';
        db.query(sql, [idAsistente, idEvento], callback);
    },
//2 Confirmación de Participación:Confirmar la asistencia de un usuario Status: 200 OK
    confirmarAsistencia: (idAsistente, idEvento, callback) => {
        //const sql = 'UPDATE participacion SET confirmacion = 1 WHERE idParticipacion = ?';
        const sql = 'UPDATE participacion SET confirmacion = 1 WHERE idAsistente = ? AND idEvento = ?;';
        db.query(sql, [idAsistente, idEvento], callback);
    },

    //5 Descarga de Certificados Status: 200 OK
    obtenerAsistentesConfirmadosConDetalles: (idEvento, callback) => {
        const sql = `
            SELECT a.nombre, a.email, e.nombre AS evento, e.fecha
            FROM asistente a
            JOIN participacion p ON a.idAsistente = p.idAsistente
            JOIN evento e ON p.idEvento = e.idEvento
            WHERE p.confirmacion = 1 AND p.idEvento = ?`;
        db.query(sql, [idEvento], callback);
    },

    //2 Confirmación de Participación:Ver lista de participantes confirmados para un evento Status: 200 OK
    obtenerAsistentesConfirmados: (idEvento, callback) => {
        const sql = `
            SELECT a.nombre, a.email
            FROM asistente a
            JOIN participacion p ON a.idAsistente = p.idAsistente
            WHERE p.idEvento = ? AND p.confirmacion = 1`;
        db.query(sql, [idEvento], callback);
    },

    //Status: 200 OK
    eliminar: (idParticipacion, callback) => {
        const sql = 'DELETE FROM participacion WHERE idParticipacion = ?';
        db.query(sql, [idParticipacion], callback);
    },
    
};

module.exports = Participacion;
*/


    /*
   //2 Confirmación de Participación:Ver lista de participantes confirmados para un evento Status: 200 OK
   participantesConfirmados: (idEvento, callback) => {
    const sql = 'SELECT a.nombre, a.email FROM asistente a JOIN participacion p ON a.idAsistente = p.idAsistente WHERE p.idEvento = ? AND p.confirmacion = 1;';
    db.query(sql, [idEvento], callback);
},
*/
   