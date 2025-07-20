const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { verifyFirebaseToken } = require('../middlewares/auth.middleware');
const { validateRegisterData, validateLoginData } = require('../middlewares/validation.middleware');

/**
 * @route POST /api/auth/register
 * @desc Registrar nuevo usuario (cliente o empresa)
 * @access Public
 */
router.post('/register', validateRegisterData, AuthController.register);

/**
 * @route POST /api/auth/login
 * @desc Iniciar sesión
 * @access Public (requiere token de Firebase)
 */
router.post('/login', verifyFirebaseToken, AuthController.login);

/**
 * @route GET /api/auth/profile
 * @desc Obtener perfil del usuario autenticado
 * @access Private
 */
router.get('/profile', verifyFirebaseToken, AuthController.getProfile);

/**
 * @route PUT /api/auth/profile
 * @desc Actualizar perfil del usuario
 * @access Private
 */
router.put('/profile', verifyFirebaseToken, AuthController.updateProfile);

/**
 * @route POST /api/auth/logout
 * @desc Cerrar sesión
 * @access Private
 */
router.post('/logout', verifyFirebaseToken, AuthController.logout);

module.exports = router;