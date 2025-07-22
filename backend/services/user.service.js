const UserModel = require('../models/user.model');
const Logger = require('../utils/logger');

class UserService {
  /**
   * Crear un nuevo usuario
   */
  async createUser(userData) {
    try {
      Logger.info('Creando nuevo usuario', { uid: userData.uid });
      
      // Verificar si el usuario ya existe
      const existingUser = await UserModel.getUserByUid(userData.uid);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      // Crear el usuario
      const newUser = await UserModel.createUser(userData);
      Logger.info('Usuario creado exitosamente', { uid: newUser.uid });
      
      return newUser;
    } catch (error) {
      Logger.error('Error en UserService.createUser:', error);
      throw error;
    }
  }

  /**
   * Obtener todos los usuarios
   */
  async getAllUsers() {
    try {
      Logger.info('Obteniendo todos los usuarios');
      const users = await UserModel.getUsersByType('client');
      return users;
    } catch (error) {
      Logger.error('Error en UserService.getAllUsers:', error);
      throw error;
    }
  }

  /**
   * Obtener usuario por UID
   */
  async getUserById(uid) {
    try {
      Logger.info('Obteniendo usuario por UID', { uid });
      
      if (!uid) {
        throw new Error('UID es requerido');
      }

      const user = await UserModel.getUserByUid(uid);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      Logger.error('Error en UserService.getUserById:', error);
      throw error;
    }
  }

  /**
   * Actualizar usuario
   */
  async updateUser(uid, updateData) {
    try {
      Logger.info('Actualizando usuario', { uid });
      
      const updatedUser = await UserModel.updateUser(uid, updateData);
      Logger.info('Usuario actualizado exitosamente', { uid });
      
      return updatedUser;
    } catch (error) {
      Logger.error('Error en UserService.updateUser:', error);
      throw error;
    }
  }

  /**
   * Desactivar usuario
   */
  async deactivateUser(uid) {
    try {
      Logger.info('Desactivando usuario', { uid });
      
      await UserModel.deactivateUser(uid);
      Logger.info('Usuario desactivado exitosamente', { uid });
      
      return { message: 'Usuario desactivado exitosamente' };
    } catch (error) {
      Logger.error('Error en UserService.deactivateUser:', error);
      throw error;
    }
  }
}

module.exports = new UserService();