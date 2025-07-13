const { db } = require('../server');

// Create a new user
const createUser = async (req, res) => {
  const { uid, name, email, type } = req.body;

  try {
    const userData = {
      uid,
      name,
      email,
      type, // "client" or "company"
      createdAt: new Date()
    };

    await db.collection('users').doc(uid).set(userData);

    res.status(201).json({
      message: 'User created successfully',
      data: userData
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error creating user',
      detail: error.message
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No users found' });
    }

    const users = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching users',
      detail: error.message
    });
  }
};

// Get a user by UID
const getUserById = async (req, res) => {
  const { uid } = req.params;

  try {
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: doc.data() });
  } catch (error) {
    res.status(500).json({
      error: 'Error retrieving user',
      detail: error.message
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById
};
