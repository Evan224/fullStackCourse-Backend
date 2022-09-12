const blogsRouter=require('express').Router()
const blogModel=require('../models/blogModel')

blogsRouter.get('/',(request,response) => {
    blogModel.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/',(request,response) => {
    const blog = new blogModel(request.body)
    blog.save().then(result => {
        response.status(201).json(result)
    })
})

module.exports = blogsRouter