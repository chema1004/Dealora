const UserService = require('../services/user.service');
const ResponseHelper = require('../utils/response.helper');
const Logger = require('../utils/logger');

class UserController {
  /**
   * Crear un nuevo usuario
   */
  async createUser(req, res) {
    try {
      const { uid, name, email, type } = req.body;

      // Validaciones básicas
      if (!uid || !name || !email || !type) {
        return ResponseHelper.validationError(res, [
          'UID, nombre, email y tipo son requeridos'
        ]);
      }

      const userData = {
        uid,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        type
      };

      const newUser = await UserService.createUser(userData);
      
      return ResponseHelper.success(
        res, 
        newUser, 
        'Usuario creado exitosamente', 
        201
      );

    } catch (error) {
      Logger.error('Error en UserController.createUser:', error);
      
      if (error.message === 'El usuario ya existe') {
        return ResponseHelper.conflict(res, error.message);
      }
      
      return ResponseHelper.error(res, 'Error interno del servidor');
    }
  }

  /**
   * Obtener todos los usuarios
   */
  async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      
      return ResponseHelper.success(
        res, 
        { users, count: users.length }, 
        'Usuarios obtenidos exitosamente'
      );

    } catch (error) {
      Logger.error('Error en UserController.getUsers:', error);
      return ResponseHelper.error(res, 'Error interno del servidor');
    }
  }

  /**
   * Obtener usuario por UID
   */
  async getUserById(req, res) {
    try {
      const { uid } = req.params;

      if (!uid) {
        return ResponseHelper.validationError(res, ['UID es requerido']);
      }

      const user = await UserService.getUserById(uid);
      
      return ResponseHelper.success(
        res, 
        { user }, 
        'Usuario obtenido exitosamente'
      );

    } catch (error) {
      Logger.error('Error en UserController.getUserById:', error);
      
      if (error.message === 'Usuario no encontrado') {
        return ResponseHelper.notFound(res, error.message);
      }
      
      return ResponseHelper.error(res, 'Error interno del servidor');
    }
  }

  /**
   * Actualizar usuario
   */
  async updateUser(req, res) {
    try {
      const { uid } = req.params;
      const updateData = req.body;

      if (!uid) {
        return ResponseHelper.validationError(res, ['UID es requerido']);
      }

      // Remover campos que no se pueden actualizar
      delete updateData.uid;
      delete updateData.createdAt;

      const updatedUser = await UserService.updateUser(uid, updateData);
      
      return ResponseHelper.success(
        res, 
        { user: updatedUser }, 
        'Usuario actualizado exitosamente'
      );

    } catch (error) {
      Logger.error('Error en UserController.updateUser:', error);
      
      if (error.message === 'Usuario no encontrado') {
        return ResponseHelper.notFound(res, error.message);
      }
      
      return ResponseHelper.error(res, 'Error interno del servidor');
    }
  }

  /**
   * Desactivar usuario
   */
  async deactivateUser(req, res) {
    try {
      const { uid } = req.params;

      if (!uid) {
        return ResponseHelper.validationError(res, ['UID es requerido']);
      }

      const result = await UserService.deactivateUser(uid);
      
      return ResponseHelper.success(
        res, 
        result, 
        'Usuario desactivado exitosamente'
      );

    } catch (error) {
      Logger.error('Error en UserController.deactivateUser:', error);
      
      if (error.message === 'Usuario no encontrado') {
        return ResponseHelper.notFound(res, error.message);
      }
      
      return ResponseHelper.error(res, 'Error interno del servidor');
    }
  }
}

module.exports = new UserController();