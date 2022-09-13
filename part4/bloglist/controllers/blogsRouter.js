const blogsRouter=require('express').Router()
const blogModel=require('../models/blogModel')

blogsRouter.get('/',async (request,response) => {
    try{
        const blogs=await blogModel.find({})
        response.json(blogs)
    }catch(exception){
        next(exception)
    }
})

blogsRouter.post('/',async (request,response) => {
    try{
         const blog = new blogModel(request.body)
        //  console.log(blog)
        if(!blog.likes){
            blog.likes=0
        }
         if(!blog.title||!blog.url){
               response.status(400).end()
         }else{
              const result=await blog.save()
              response.status(201).json(result)
         }
    }catch(exception){
        next(exception)
    }

})

blogsRouter.delete('/:id',async (request,response) => {
    try{
        await blogModel.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }catch(exception){
        next(exception)
    }
})

blogsRouter.put('/:id',async (request,response) => {
    try{
        const blog = new blogModel(request.body)
        const newBlog={
            title:blog.title,
            author:blog.author,
            url:blog.url,
            likes:blog.likes,
        }
        const result=await blogModel.findByIdAndUpdate(request.params.id,newBlog,{new:true})
        response.status(201).json(result)
    }catch(exception){
        next(exception)
    }     
})

module.exports = blogsRouter