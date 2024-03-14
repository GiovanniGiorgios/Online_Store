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
    async registration(req, res){
        const {email, password, role} = req.body

        if(!email || !password){
            return next(ApiError.badRequest('Bad email or password'))
        }
        // перевірка чи існує користувач з таким email
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Користувач з таким email уже є!'))
        }
        const hashPassword = await bcrypt.hash(password, 5) // 5 - склькі разів хешировать
        const user = await User.create({email, role, password: hashPassword})

        // const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role); 
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){ 
            return next(ApiError.internal('Користувач не знайдений'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Паролі не збігаються'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
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