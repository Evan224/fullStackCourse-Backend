const Blog=require('User/blogModel')
const initialBlogs=[
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },{
        title: "Learning Go",
        author: "Jon Bodner",
        url: "https://www.oreilly.com/library/view/learning-go/9781492077206/",
        likes: 3
    },{
        title: "React patterns2",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 71
    },{
        title: "Go: Generics, Extensibility",
        author: "Jon Bodner",
        url: "https://www.oreilly.com/videos/go-generics-extensibility/0636920551942/",
        likes: 7
    },{
        title: "React patterns3",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 723
    },
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}

const blogInDb=async()=>{
    const blogs=await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
}

module.exports= {initialBlogs,nonExistingId,blogInDb}