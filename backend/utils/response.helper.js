/**
 * Helpers para respuestas estandarizadas de la API
 */

class ResponseHelper {
  /**
   * Respuesta exitosa
   */
  static success(res, data, message = 'Operación exitosa', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Respuesta de error
   */
  static error(res, message, statusCode = 500, errorCode = null, details = null) {
    const response = {
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    };

    if (errorCode) {
      response.code = errorCode;
    }

    if (details) {
      response.details = details;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Respuesta de validación
   */
  static validationError(res, errors) {
    return res.status(400).json({
      success: false,
      error: 'Errores de validación',
      details: errors,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Respuesta de no autorizado
   */
  static unauthorized(res, message = 'No autorizado') {
    return res.status(401).json({
      success: false,
      error: message,
      code: 'UNAUTHORIZED',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Respuesta de no encontrado
   */
  static notFound(res, message = 'Recurso no encontrado') {
    return res.status(404).json({
      success: false,
      error: message,
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Respuesta de conflicto
   */
  static conflict(res, message = 'Conflicto de recursos') {
    return res.status(409).json({
      success: false,
      error: message,
      code: 'CONFLICT',
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = ResponseHelper;