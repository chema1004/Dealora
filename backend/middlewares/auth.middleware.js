const { admin } = require('../server');

/**
 * Middleware para verificar el token de Firebase
 */
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Token de autorización requerido',
        code: 'MISSING_TOKEN'
      });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verificar el token con Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Agregar la información del usuario al request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      provider: decodedToken.firebase.sign_in_provider
    };
    
    next();
  } catch (error) {
    console.error('Error verificando token:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: 'Token expirado',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(401).json({
      error: 'Token inválido',
      code: 'INVALID_TOKEN'
    });
  }
};

/**
 * Middleware opcional para verificar token (no falla si no hay token)
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        provider: decodedToken.firebase.sign_in_provider
      };
    }
    
    next();
  } catch (error) {
    // En modo opcional, continuamos sin usuario autenticado
    next();
  }
};

module.exports = {
  verifyFirebaseToken,
  optionalAuth
};