import PostModel from '../models/Post.js'
import AppError from '../errors/AppError.js'

class Post{
    async getAll(req, res, next) {
        try {
            const {categoryId = null} = req.params
            let {limit = null, page = null} = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = {categoryId, limit, page}
            const posts = await PostModel.getAll(options)
            res.json(posts)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const post = await PostModel.getOne(req.params.id)
            res.json(post)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const post = await PostModel.create(req.body, req.files?.image)
            res.json(post)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }



    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const post = await PostModel.update(req.params.id, req.body, req.files?.image)
            res.json(post)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const post = await PostModel.delete(req.params.id)
            res.json(post)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Post();