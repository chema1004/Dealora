# Dealora Backend

Backend de la aplicación Dealora desarrollado con Node.js, Express y Firebase Admin SDK.

## 🚀 Características

- **Autenticación completa**: Login y registro con Google y email/contraseña
- **Diferenciación de usuarios**: Soporte para clientes y empresas
- **Firebase Integration**: Autenticación y base de datos con Firebase
- **Arquitectura escalable**: Estructura modular y mantenible
- **Validaciones robustas**: Middleware de validación y manejo de errores
- **CORS configurado**: Soporte para múltiples frontends
- **Logging**: Sistema de logs estructurado

## 📁 Estructura del proyecto

```
backend/
├── app.js                 # Configuración principal de Express
├── server.js             # Inicialización de Firebase Admin
├── controllers/          # Lógica de negocio
│   ├── auth.controller.js
│   └── user.controller.js
├── middlewares/          # Middlewares personalizados
│   ├── auth.middleware.js
│   ├── validation.middleware.js
│   └── cors.middleware.js
├── models/              # Modelos de datos
│   └── user.model.js
├── routes/              # Definición de rutas
│   ├── auth.routes.js
│   └── user.routes.js
├── utils/               # Utilidades
│   ├── logger.js
│   └── response.helper.js
└── config/              # Configuración de Firebase
    └── dealora-54a9b-firebase-adminsdk-fbsvc-3781478ad0.json
```

## 🛠️ Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

3. **Iniciar el servidor**:
   ```bash
   # Desarrollo
   npm run dev

   # Producción
   npm start
   ```

## 📡 Endpoints de la API

### Autenticación

#### `POST /api/auth/register`
Registra un nuevo usuario (cliente o empresa).

**Body**:
```json
{
  "uid": "firebase_uid",
  "email": "usuario@email.com",
  "name": "Nombre Usuario",
  "type": "client", // o "company"
  "provider": "email", // o "google"
  "companyData": { // Solo para type: "company"
    "businessName": "Mi Empresa",
    "category": "Restaurante",
    "description": "Descripción opcional",
    "website": "https://miempresa.com",
    "phone": "+1234567890"
  }
}
```

#### `POST /api/auth/login`
Inicia sesión de un usuario existente.

**Headers**:
```
Authorization: Bearer <firebase_token>
```

#### `GET /api/auth/profile`
Obtiene el perfil del usuario autenticado.

**Headers**:
```
Authorization: Bearer <firebase_token>
```

#### `PUT /api/auth/profile`
Actualiza el perfil del usuario.

**Headers**:
```
Authorization: Bearer <firebase_token>
```

#### `POST /api/auth/logout`
Cierra la sesión del usuario.

### Health Check

#### `GET /health`
Verifica el estado del servidor.

## 🔐 Autenticación

El sistema utiliza Firebase Authentication con los siguientes proveedores:
- **Email/Contraseña**: Autenticación tradicional
- **Google**: OAuth con Google

### Flujo de autenticación:

1. **Frontend**: Autentica con Firebase Client SDK
2. **Frontend**: Envía el token de Firebase al backend
3. **Backend**: Verifica el token con Firebase Admin SDK
4. **Backend**: Busca/crea el usuario en Firestore
5. **Backend**: Retorna los datos del usuario

## 👥 Tipos de usuario

### Cliente (`client`)
- Usuarios finales que buscan ofertas
- Perfil básico con información personal

### Empresa (`company`)
- Negocios que ofrecen promociones
- Perfil extendido con información comercial
- Campos adicionales: categoría, descripción, sitio web, etc.

## 🛡️ Seguridad

- **Validación de entrada**: Middleware de validación para todos los endpoints
- **Autenticación robusta**: Verificación de tokens Firebase
- **CORS configurado**: Control de acceso desde dominios específicos
- **Manejo de errores**: Respuestas estructuradas sin exposición de datos sensibles

## 🔧 Configuración de desarrollo

### Variables de entorno requeridas:

```env
FIREBASE_PRIVATE_KEY_PATH=./config/dealora-54a9b-firebase-adminsdk-fbsvc-3781478ad0.json
PORT=3000
NODE_ENV=development
```

### Scripts disponibles:

```bash
npm start          # Inicia el servidor en producción
npm run dev        # Inicia el servidor en desarrollo con nodemon
npm test           # Ejecuta las pruebas (por implementar)
```

## 🚀 Despliegue

### Preparación para producción:

1. **Configurar variables de entorno de producción**
2. **Actualizar CORS con dominios de producción**
3. **Configurar Firebase para producción**
4. **Desplegar en plataforma elegida** (Heroku, Railway, etc.)

### Consideraciones:

- El archivo de configuración de Firebase debe estar seguro
- Las variables de entorno deben configurarse en el servidor
- Los dominios de CORS deben actualizarse para producción

## 🔄 Próximas mejoras

- [ ] Implementar rate limiting
- [ ] Agregar tests unitarios e integración
- [ ] Sistema de roles y permisos más granular
- [ ] Endpoints específicos para empresas
- [ ] Sistema de notificaciones
- [ ] Métricas y analytics
- [ ] Documentación con Swagger/OpenAPI

## 📞 Soporte

Para dudas o problemas, contacta al equipo de desarrollo de Dealora.