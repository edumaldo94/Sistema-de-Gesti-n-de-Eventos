// /middleware/authMiddleware.js

const { verifyToken } = require('../services/authService');

const authMiddleware = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        console.log("token = "+token)
        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        const verified = verifyToken(token);
        if (!verified) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        req.user = verified;  // Almacena los datos del usuario en la solicitud

        // Verifica si el usuario tiene uno de los roles permitidos
        if (rolesPermitidos.length && !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
        }

        next();
    };
};

module.exports = authMiddleware;

/*
const { verifyToken } = require('../services/authService');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const verified = verifyToken(token);
    if (!verified) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    req.user = verified;  // Almacena los datos del usuario en la solicitud
    next();
};

module.exports = authMiddleware;
*/