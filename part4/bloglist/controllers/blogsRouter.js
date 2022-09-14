const jwt=require('jsonwebtoken')
const blogsRouter=require('express').Router()
const Blog=require('../models/blogModel')
const User=require('../models/userModel')

const getTokenFrom=(request)=>{
    const authorization=request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

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
    
        let user=request.user
        // const token = request.token
        // console.log(token,'12312312');
        // const decodedToken = jwt.verify(token, process.env.SECRET)
        // if (!decodedToken.id) {
        //   return response.status(401).json({ error: 'token missing or invalid' })
        // }
        user=await User.findById(user.id)
        // const user = await User.findById(decodedToken.id)
        console.log(user,'12321321useruseruser')
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

    const user=request.user
    // if(!decodedUser||!decodedUser.id){
    //     return response.status(401).json({error:'token invalid'})
    // }
    // const user=request.user;
    const blog=await Blog.findById(request.params.id)
    console.log(user,'---------------------',blog)
    if(blog.user.id.toString()===user._id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).json({message:'delete success'})
    }else{
        response.status(401).json({error:'no permission to delete'}) 
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