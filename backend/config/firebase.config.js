const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const serviceAccount = require(path.resolve(__dirname, process.env.FIREBASE_PRIVATE_KEY_PATH));


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

console.log('✅ db inicializado:', typeof db !== 'undefined');

module.exports = {admin, db};
