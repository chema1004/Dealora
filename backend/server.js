const app = require('./app');
const { admin, db } = require('./config/firebase');
const Logger = require('./utils/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Verificar conexión a Firebase
    Logger.info('Verificando conexión a Firebase...');
    
    // Test básico de Firebase Admin
    await admin.auth().listUsers(1);
    Logger.info('✅ Conexión a Firebase Admin exitosa');
    
    // Test básico de Firestore
    await db.collection('_health_check').limit(1).get();
    Logger.info('✅ Conexión a Firestore exitosa');
    
    // Iniciar servidor HTTP
    const server = app.listen(PORT, () => {
      Logger.info(`🚀 Servidor Dealora iniciado exitosamente`);
      Logger.info(`📡 Escuchando en puerto: ${PORT}`);
      Logger.info(`🌐 URL: http://localhost:${PORT}`);
      Logger.info(`💚 Health check: http://localhost:${PORT}/health`);
      Logger.info(`🔐 API Auth: http://localhost:${PORT}/api/auth`);
      Logger.info(`👥 API Users: http://localhost:${PORT}/api/users`);
    });

    // Manejo de cierre graceful
    const gracefulShutdown = (signal) => {
      Logger.info(`\n🛑 Recibida señal ${signal}. Cerrando servidor...`);
      
      server.close(() => {
        Logger.info('✅ Servidor HTTP cerrado');
        Logger.info('🔥 Cerrando conexiones de Firebase...');
        
        // Cerrar conexiones de Firebase si es necesario
        process.exit(0);
      });

      // Forzar cierre después de 10 segundos
      setTimeout(() => {
        Logger.error('❌ Forzando cierre del servidor');
        process.exit(1);
      }, 10000);
    };

    // Escuchar señales del sistema
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Manejo de errores no capturados
    process.on('uncaughtException', (error) => {
      Logger.error('❌ Error no capturado:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      Logger.error('❌ Promesa rechazada no manejada:', reason);
      Logger.error('En promesa:', promise);
      process.exit(1);
    });

    return server;

  } catch (error) {
    Logger.error('❌ Error al iniciar el servidor:', error);
    
    if (error.code === 'ENOENT') {
      Logger.error('🔥 Archivo de configuración de Firebase no encontrado');
      Logger.error('📁 Verifica que existe: ./config/dealora-54a9b-firebase-adminsdk-fbsvc-3781478ad0.json');
    }
    
    if (error.code === 'EADDRINUSE') {
      Logger.error(`🚫 El puerto ${PORT} ya está en uso`);
      Logger.error('💡 Intenta cambiar el puerto en el archivo .env o cierra la aplicación que lo está usando');
    }
    
    process.exit(1);
  }
};

// Iniciar servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}

module.exports = { startServer };