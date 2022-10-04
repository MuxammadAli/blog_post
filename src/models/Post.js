import { Post as PostMapping } from "./mapping.js";
import { Category as CategoryMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'


class Post{
    async getAll(options) {
        const {categoryId, limit, page} = options
        const offset = (page - 1) * limit
        const where = {}
        if(categoryId) where.categoryId = categoryId
        if(brandId) where.brandId = brandId
        const posts = await PostMapping.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {model: CategoryMapping, as: 'category'}
            ]
        })
        return posts
    }


    async getOne(id) {
        const post = await PostMapping.findByPk(id, {
            include: [
                {model: CategoryMapping, as: 'category'}
            ]
        })

        if(!post) {
            throw new Error('Пост не найден в БД')
        }
        return post
    }


    async create(data, img) {
        const image = FileService.save(img) ?? ''
        const {name, title, description, categoryId = null} = data
        const post = await PostMapping.create({name, title, image, description, categoryId})
        const created = await PostMapping.findByPk(post.id)
        return created
    }


    async update(id, data, img) {
        const post = await PostMapping.findByPk(id)
        if(!post){
            throw new Error('Пост не найден в БД')
        }
        const file = FileService.save(img)

        if(file && post.image) {
            FileService.delete(post.image)
        }

        const {
            name = post.name,
            title = post.title,
            categoryId = post.categoryId,
            description = post.description,
            image = file ? file : post.image
        } = data

        await post.update({name, title, categoryId, image, description})
        await post.reload()
        return post
    }



    async delete(id) {
        const post = await PostMapping.findByPk(id)
        if(!post) {
            throw new Error('Пост не найден в БД')
        }

        if(post.image) {
            FileService.delete(post.image)
        }

        await post.destroy()
        return post
    }

}

export default  new Post