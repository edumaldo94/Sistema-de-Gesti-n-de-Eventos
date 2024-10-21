const db = require('../config/db');
const { hashPassword } = require('../services/passwordService');  // Importar la función de hash

const Usuario = {
    // Crear un nuevo usuario (puede ser organizador o asistente)
    crear: async (datosUsuario, callback) => {
        try {
       
      
            const sql = 'INSERT INTO usuarios (nombre, email, password, idRol) VALUES (?, ?, ?, ?)';
            
            // Ejecutar la consulta con la contraseña hasheada
            db.query(sql, [datosUsuario.nombre, datosUsuario.email, datosUsuario.password, datosUsuario.idRol], callback);
        } catch (error) {
            callback(error);
        }
    },

    // Obtener un usuario por su email (para autenticación)
    obtenerPorEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], callback);
    },

    // Obtener el rol de un usuario por su ID
    obtenerRolPorId: (idUsuario, callback) => {
        const sql = 'SELECT r.rolNombre FROM roles r JOIN usuarios u ON u.idRol = r.idRol WHERE u.idUsuario = ?';
        db.query(sql, [idUsuario], callback);
    }
};

module.exports = Usuario;
