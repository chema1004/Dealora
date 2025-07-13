const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:uid', userController.getUserById);

module.exports = router;
