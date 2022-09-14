const blogsRouter=require('express').Router()
const Blog=require('../models/blogModel')
const User=require('../models/userModel')

blogsRouter.get('/',async (request,response) => {
    try{
        const blogs=await Blog.find({})
        response.json(blogs)
    }catch(exception){
        next(exception)
    }
})

blogsRouter.post('/',async (request,response) => {
         const blog = new Blog(request.body)
        //  console.log(blog)
        const body=request.body
        const user=await User.findById(body.userId)
        // console.log(user,'12321321312')
        if(!blog.likes){
            blog.likes=0
        }
         if(!blog.title||!blog.url){
               response.status(400).end()
         }else{
            blog.user={
                id:user._id,
                username:user.username,
                name:user.name
            }
                const savedBlog=await blog.save()
                user.blogs=user.blogs.concat(savedBlog._id)
              await user.save()
              response.status(201).json(savedBlog)
         }

         
    

})

blogsRouter.delete('/:id',async (request,response) => {
    try{
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }catch(exception){
        next(exception)
    }
})

blogsRouter.put('/:id',async (request,response) => {
    try{
        const blog = new Blog(request.body)
        const newBlog={
            title:blog.title,
            author:blog.author,
            url:blog.url,
            likes:blog.likes,
        }
        const result=await Blog.findByIdAndUpdate(request.params.id,newBlog,{new:true})
        response.status(201).json(result)
    }catch(exception){
        next(exception)
    }     
})

module.exports = blogsRouter