//jsonwebtoken - для створення самого jwt токена
//bcrypt - для хеширования паролів і тп. щоб не зберігати у відкритому доступі
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'} // опції, час життя
    )
}

class UserController {
    async getOrsaveNewUserInDatabase(req, res){
        const {email, uid} = req.body

        if(!email || !uid){
            return next(ApiError.badRequest('Bad email or uid'))
        }

        const currentUser = await User.findOne({where: {uid}})
        if(currentUser){
            return res.json({ user: currentUser })
        }

        const newUser = await User.create({email, role: "ADMIN", uid})

        // const basket = await Basket.create({userId: user.id})
        return res.json({ user: newUser })
    }

    async getUserFromDatabase(req, res, next){
        const {uid} = req.body

        if(!uid){
            // return next(ApiError.badRequest('Bad uid'))
            return null;
        }

        const currentUser = await User.findOne({where: {uid}})

        if(!currentUser){ 
            return next(ApiError.internal('User not found'))
        }

        return res.json({ user: currentUser})
    }

    async checkAuth(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()


//const query = req.query
/* const {id} = req.query //Деструктуризация(щоб витянути одразу id) можна також query.id
if(!id){
    return next(ApiError.badRequest('Не вказаний id'))
}
res.json (id) */