import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AppError from '../errors/AppError.js'

const makeJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}



class User{
    async signup(req, res, next) {
        const {email, password} = req.body
        try {
            if (!email || !password) {
                throw new Error('Пустой email или пароль')
            }
            const hash = await bcrypt.hash(password, 5)
            const user = await UserModel.create({email, password: hash})
            const token = makeJwt(user.id, user.email)
            return res.json({token})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await UserModel.getByEmail(email)
            let compare = bcrypt.compareSync(password, user.password)
            if (!compare) {
                throw new Error('Указан неверный пароль')
            }
            const token = makeJwt(user.id, user.email)
            return res.json({token})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async check(req, res, next) {
        const token = makeJwt(req.auth.id, req.auth.email)
        return res.json({token})
    }


    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll()
            res.json(users)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.getOne(req.params.id)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        const {email, password} = req.body
        try {
            if (!email || !password) {
                throw new Error('Пустой email или пароль')
            }
            const hash = await bcrypt.hash(password, 5)
            const user = await UserModel.create({email, password: hash})
            return res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            let {email, password} = req.body
            if (password) {
                password = await bcrypt.hash(password, 5)
            }
            const user = await UserModel.update(req.params.id, {email, password})
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.delete(req.params.id)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}


export default new User();