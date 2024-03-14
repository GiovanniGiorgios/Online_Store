const Router = require('express')
const router = new Router() 
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

// методи для type
router.post('/', checkRole('ADMIN'), typeController.create) //метод для створення 
router.get('/', typeController.getAll) //метод для отримування
//ще треба метод delete доработать треба мамому 

module.exports = router

