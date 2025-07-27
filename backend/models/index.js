// models/index.js
const { db } = require('../config/firebase.config');
const UserModel = require('./user.model');

const userModel = new UserModel(db);

module.exports = { userModel };
