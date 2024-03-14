const Router = require('express')
const router = new Router() // головний роутер 
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const usersInfoRouter = require('./usersInfoRouter')

//под роутери
router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)

router.use('/usersInfo', usersInfoRouter)

module.exports = router

