const { db } = require('../config/firebase.config');

class UserModel {
  constructor(db) {
    if (!db) throw new Error('❌ Firestore db is undefined in UserModel constructor');
    this.collection = db.collection('users');
  }

  /**
   * Crear un nuevo usuario en Firestore
   */
  async createUser(userData) {
    try {
      const userDoc = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      };

      await this.collection.doc(userData.uid).set(userDoc);
      return userDoc;
    } catch (error) {
      throw new Error(`Error creando usuario: ${error.message}`);
    }
  }

  /**
   * Obtener usuario por UID
   */
  async getUserByUid(uid) {
    try {
      const doc = await this.collection.doc(uid).get();
      
      if (!doc.exists) {
        return null;
      }

      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error obteniendo usuario: ${error.message}`);
    }
  }

  /**
   * Obtener usuario por email
   */
  async getUserByEmail(email) {
    try {
      const snapshot = await this.collection
        .where('email', '==', email)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error obteniendo usuario por email: ${error.message}`);
    }
  }

  /**
   * Actualizar usuario existente
   */
  async updateUser(uid, updateData) {
    try {
      const updateDoc = {
        ...updateData,
        updatedAt: new Date()
      };

      await this.collection.doc(uid).update(updateDoc);
      return await this.getUserByUid(uid);
    } catch (error) {
      throw new Error(`Error actualizando usuario: ${error.message}`);
    }
  }

  /**
   * Verificar si un usuario existe
   */
  async userExists(uid) {
    try {
      const doc = await this.collection.doc(uid).get();
      return doc.exists;
    } catch (error) {
      throw new Error(`Error verificando existencia de usuario: ${error.message}`);
    }
  }

  /**
   * Obtener usuarios por tipo
   */
  async getUsersByType(type) {
    try {
      const snapshot = await this.collection
        .where('type', '==', type)
        .where('isActive', '==', true)
        .get();

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error obteniendo usuarios por tipo: ${error.message}`);
    }
  }

  /**
   * Desactivar usuario (soft delete)
   */
  async deactivateUser(uid) {
    try {
      await this.collection.doc(uid).update({
        isActive: false,
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      throw new Error(`Error desactivando usuario: ${error.message}`);
    }
  }
}

module.exports = new UserModel(db);
