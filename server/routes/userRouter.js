const Router = require('express')
const router = new Router() 
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// методи для user
router.post('/registration', userController.registration)  
router.post('/login', userController.login) 
router.get('/auth', authMiddleware, userController.checkAuth) // чи авторизований користувач по jwt токену

module.exports = router

