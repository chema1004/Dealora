const express = require('express');
const Logger = require('./utils/logger');
const corsMiddleware = require('./middlewares/cors.middleware');
const app = express();
require('dotenv').config();

// Middleware de logging para requests
app.use((req, res, next) => {
  Logger.request(req);
  next();
});

// Configuración de CORS
app.use(corsMiddleware);

app.use(express.json()); // Necesario para leer JSON en el body
app.use(express.urlencoded({ extended: true })); // Para formularios

// Rutas de autenticación
app.use('/api/auth', require('./routes/auth.routes'));

// Rutas existentes
app.use('/api', require('./routes/user.routes'));

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Dealora Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  Logger.error('Error no manejado:', error);
  
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  Logger.info(`🚀 Dealora Backend iniciado en puerto ${PORT}`);
  Logger.info(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
