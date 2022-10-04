import express from 'express'

import post from './post.js'
import category from './category.js'
import user from './user.js'


const router = new express.Router()

router.use('/post', post)
router.use('/category', category)
router.use('/user', user)


export default router