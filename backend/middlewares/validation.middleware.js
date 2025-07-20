/**
 * Middleware de validación para datos de entrada
 */

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUserType = (type) => {
  return ['client', 'company'].includes(type);
};

const validateRegisterData = (req, res, next) => {
  const { email, name, type, companyData } = req.body;
  const errors = [];

  // Validar email
  if (!email) {
    errors.push('Email es requerido');
  } else if (!validateEmail(email)) {
    errors.push('Email no tiene un formato válido');
  }

  // Validar nombre
  if (!name || name.trim().length < 2) {
    errors.push('Nombre debe tener al menos 2 caracteres');
  }

  // Validar tipo de usuario
  if (!type) {
    errors.push('Tipo de usuario es requerido');
  } else if (!validateUserType(type)) {
    errors.push('Tipo de usuario debe ser "client" o "company"');
  }

  // Validaciones específicas para empresas
  if (type === 'company') {
    if (!companyData) {
      errors.push('Datos de empresa son requeridos para tipo "company"');
    } else {
      if (!companyData.businessName || companyData.businessName.trim().length < 2) {
        errors.push('Nombre de empresa es requerido');
      }
      if (!companyData.category || companyData.category.trim().length < 2) {
        errors.push('Categoría de empresa es requerida');
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: errors
    });
  }

  next();
};

const validateLoginData = (req, res, next) => {
  const { email, provider } = req.body;
  const errors = [];

  // Para login con email/password
  if (provider === 'email' || !provider) {
    if (!email) {
      errors.push('Email es requerido');
    } else if (!validateEmail(email)) {
      errors.push('Email no tiene un formato válido');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateRegisterData,
  validateLoginData,
  validateEmail,
  validateUserType
};