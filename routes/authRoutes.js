const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middlewares/authMiddleware');



//register page
router.get('/signup', authController.registerPage)

//register user
router.post('/register', authController.registerUser)

//login
router.get('/login', authController.loginPage)

//log user in
router.post('/login', authController.logUserIn)

//logout
router.post('/logout', isAuthenticated, authController.userLogout)

module.exports = router;