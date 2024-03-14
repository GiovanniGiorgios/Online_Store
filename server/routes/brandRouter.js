const Router = require('express')
const router = new Router() 
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

// методи для brend
router.post('/', checkRole('ADMIN'), brandController.create) //метод для створення 
router.get('/', brandController.getAll) //метод для отримування
//ще треба метод delete доработать треба мамому 
    
module.exports = router

 