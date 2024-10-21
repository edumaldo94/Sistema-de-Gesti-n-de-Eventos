// /services/authService.js

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/jwt'); // Importar clave secreta y expiración

const generateToken = (usuario) => {
    console.log("Token generado:", usuario);
    return jwt.sign({ id: usuario.idUsuario, email: usuario.email, rol:usuario.idRol }, jwtSecret, { expiresIn: jwtExpiration });
};

const verifyToken = (token) => {
    try {
        console.log("Verificando token:", token); // Log del token

        // Si el token viene con el prefijo 'Bearer ', debes quitarlo
        const tokenSinBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        // Verificamos el token
        const decoded = jwt.verify(tokenSinBearer, jwtSecret);
        console.log("Token verificado:", decoded); // Log de los datos del token verificado
        return decoded;
    } catch (err) {
        console.log("Error al verificar el token:", err.message); // Log del error
        return null;  // Si el token es inválido o ha expirado
    }
};
/*
const verifyToken = (token) => {
    try {
        console.log("Verificando token:", token); // Log del token
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        console.log("Error al verificar el token:", err); // Log del error
        return null;  // Si el token es inválido o ha expirado
    }
};
*/
module.exports = {
    generateToken,
    verifyToken
};
