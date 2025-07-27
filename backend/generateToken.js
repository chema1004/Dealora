const admin = require('firebase-admin');
const serviceAccount = require('./config/dealora-54a9b-firebase-adminsdk-fbsvc-3781478ad0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userData = {
  uid: "user123",
  email: "user123@example.com",
  password: "123456",
  displayName: "Usuario Prueba"
};

async function createUserIfNotExistsAndGetToken(user) {
  try {
    // Intenta obtener el usuario
    let existingUser;
    try {
      existingUser = await admin.auth().getUserByEmail(user.email);
      console.log("✅ Usuario ya existe:", existingUser.uid);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // Crear nuevo usuario
        existingUser = await admin.auth().createUser({
          uid: user.uid,
          email: user.email,
          password: user.password,
          displayName: user.displayName,
        });
        console.log("👤 Usuario creado:", existingUser.uid);
      } else {
        throw err;
      }
    }

    // Generar token
    const token = await admin.auth().createCustomToken(existingUser.uid);
    console.log("🔐 Token personalizado generado:\n", token);

  } catch (error) {
    console.error("❌ Error creando usuario o generando token:", error);
  }
}

createUserIfNotExistsAndGetToken(userData);
