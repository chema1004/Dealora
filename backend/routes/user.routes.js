const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyFirebaseToken } = require('../middlewares/auth.middleware');

/**
 * @route GET /api/users
 * @desc Obtener todos los usuarios
 * @access Private
 */
router.get('/users', verifyFirebaseToken, userController.getUsers);

/**
 * @route GET /api/users/:uid
 * @desc Obtener usuario por UID
 * @access Private
 */
router.get('/users/:uid', verifyFirebaseToken, userController.getUserById);

/**
 * @route POST /api/users
 * @desc Crear nuevo usuario
 * @access Private
 */
router.post('/users', verifyFirebaseToken, userController.createUser);

console.log('userRoutes_ok');
module.exports = router;