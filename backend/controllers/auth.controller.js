const userModel = require('../models/user.model');

class AuthController {
  /**
   * Registro de usuarios (clientes y empresas)
   */
  async register(req, res) {
    try {
      const { uid, email, name, type, companyData, provider = 'email' } = req.body;
      
      //Validacion de datos
      if (!uid || !email || !name || !type) {
        return res.status(400).json({ error: 'Faltan campos requeridos para el registro' });
      }

      // Verificar si el usuario ya existe en Firestore
      const existingUser = await userModel.getUserByUid(uid);
      
      if (existingUser) {
        return res.status(200).json({
          message: 'Usuario ya registrado',
          user: existingUser,
          isNewUser: false
        });
      }

      // Verificar si el email ya está en uso por otro usuario
      const userByEmail = await userModel.getUserByEmail(email);
      if (userByEmail && userByEmail.uid !== uid) {
        return res.status(409).json({
          error: 'El email ya está registrado con otra cuenta',
          code: 'EMAIL_ALREADY_EXISTS'
        });
      }

      // Preparar datos del usuario
      const userData = {
        uid,
        email,
        name: name.trim(),
        type,
        provider,
        profile: {
          avatar: null,
          phone: null,
          address: null
        }
      };

      // Agregar datos específicos para empresas
      if (type === 'company' && companyData) {
        userData.companyInfo = {
          businessName: companyData.businessName.trim(),
          category: companyData.category.trim(),
          description: companyData.description || null,
          website: companyData.website || null,
          phone: companyData.phone || null,
          address: companyData.address || null,
          verified: false,
          rating: 0,
          totalReviews: 0
        };
      }

      // Crear usuario en Firestore
      const newUser = await userModel.createUser(userData);

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser,
        isNewUser: true
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        error: 'Error interno del servidor durante el registro',
        detail: error.message
      });
    }
  }

  /**
   * Login de usuarios
   */
  async login(req, res) {
    try {
      const { uid } = req.user; // Viene del middleware de autenticación

      // Buscar usuario en Firestore
      const user = await userModel.getUserByUid(uid);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado en la base de datos',
          code: 'USER_NOT_FOUND',
          suggestion: 'El usuario debe completar el proceso de registro'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          error: 'Cuenta desactivada',
          code: 'ACCOUNT_DEACTIVATED'
        });
      }

      // Actualizar último login
      await userModel.updateUser(uid, {
        lastLogin: new Date()
      });

      // Obtener datos actualizados
      const updatedUser = await userModel.getUserByUid(uid);

      res.status(200).json({
        message: 'Login exitoso',
        user: updatedUser
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        error: 'Error interno del servidor durante el login',
        detail: error.message
      });
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(req, res) {
    try {
      const { uid } = req.user;

      const user = await userModel.getUserByUid(uid);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          code: 'USER_NOT_FOUND'
        });
      }

      res.status(200).json({
        user
      });

    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        detail: error.message
      });
    }
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(req, res) {
    try {
      const { uid } = req.user;
      const updateData = req.body;

      // Remover campos que no se pueden actualizar directamente
      delete updateData.uid;
      delete updateData.email;
      delete updateData.type;
      delete updateData.createdAt;
      delete updateData.isActive;

      const updatedUser = await userModel.updateUser(uid, updateData);

      res.status(200).json({
        message: 'Perfil actualizado exitosamente',
        user: updatedUser
      });

    } catch (error) {
      console.error('Error actualizando perfil:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        detail: error.message
      });
    }
  }

  /**
   * Logout (invalidar sesión del lado del servidor si es necesario)
   */
  async logout(req, res) {
    try {
      // En Firebase, el logout se maneja principalmente del lado del cliente
      // Aquí podemos registrar el evento o limpiar datos de sesión si es necesario
      
      res.status(200).json({
        message: 'Logout exitoso'
      });

    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        detail: error.message
      });
    }
  }
  
}

module.exports = new AuthController();