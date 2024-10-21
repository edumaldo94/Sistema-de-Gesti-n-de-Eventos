// ../controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
// Registrar un nuevo usuario
const { hashPassword, verifyPassword } = require('../services/passwordService');

const { generateToken } = require('../services/authService');
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password, idRol } = req.body;

    // Verifica que el campo 'password' sea una cadena válida
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'La contraseña es inválida o no está presente' });
    }

    try {
        // Verificar si el usuario ya existe
        Usuario.obtenerPorEmail(email, async (err, usuarioExistente) => {
            if (usuarioExistente.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            // Hashear la contraseña
            const hashedPassword = await hashPassword(password);

            // Crear el usuario
            const nuevoUsuario = {
                nombre,
                email,
                password: hashedPassword,
                idRol
            };

            Usuario.crear(nuevoUsuario, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Usuario registrado con éxito', id: result.insertId });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Iniciar sesión (Autenticación)
exports.login = (req, res) => {
    const { email, password } = req.body;

    Usuario.obtenerPorEmail(email, async (err, usuario) => {
        if (err || usuario.length === 0) {
            console.log("Usuario no encontrado o error:", err);
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        console.log("Usuario encontrado:", usuario);

        // Verificar la contraseña
        const validPassword = await verifyPassword(password, usuario[0].password);  // Asegúrate de acceder a usuario[0].password
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = generateToken(usuario[0]);  // Asegúrate de pasar el usuario correcto para generar el token
        res.json({ token });
    });
};

// Obtener el rol de un usuario
exports.obtenerRol = (req, res) => {
    const { idUsuario } = req.params;

    Usuario.obtenerRolPorId(idUsuario, (err, rol) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rol);
    });
};
