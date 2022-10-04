import express from 'express'
import PostController from '../controllers/Post.js'


const router = new express.Router()

router.get('/getall/categoryId/:categoryId([0-9]+)', PostController.getAll)

router.get('/getall', PostController.getAll)

router.get('/getone/:id([0-9]+)', PostController.getOne)

router.post('/create', PostController.create)

router.put('/update/:id([0-9]+)',  PostController.update)

router.delete('/delete/:id([0-9]+)', PostController.delete)

export default router