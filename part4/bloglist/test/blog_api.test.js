const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const Blog=require('../models/blogModel')
const {initialBlogs,nonExistingId,blogInDb}=require('./test_helper')


beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe("test the property of blogs",()=>{
    test("valid add blog method", async () => {
        const newBlog={
            title: "React patterns4",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7232,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response=await api.get('/api/blogs')
        const titles=response.body.map(r=>r.title)
        expect(response.body).toHaveLength(initialBlogs.length+1)
        expect(titles).toContain(newBlog.title)
    })
    
    test("like property default 0", async () => {
        const newBlog={
            title: "React patterns4",
            author:"nonsd",
            url:'123'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response=await api.get('/api/blogs')
        const likes=response.body.find(r=>r.title===newBlog.title).likes
        expect(response.body).toHaveLength(initialBlogs.length+1)
        expect(likes).toEqual(0)
    })
})

describe("test RESTFUL api of blogs",()=>{
    test('there are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
       
    test('there are two blogs', async () => {
        const response=await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })
     
    test("blog without title will not be added", async () => {
        const newBlog={
            url: "https://reactpatterns.com/",
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const response=await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    
    test("blog without url will not be added", async () => {
        const newBlog={
            title: "test2/",
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const response=await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test("delet certian blog", async () => {
        const blogTemp=await blogInDb()
        const deleteBlog=blogTemp[Math.random()*blogTemp.length|0]
        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .expect(204)
        
        const response=await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length-1)
    })

    test("update certian blog", async () => {
        const blogTemp=await blogInDb()
        const updateBlog=blogTemp[Math.random()*blogTemp.length|0]
        const updateBlogInfo={
            title: "UPDATE",
            author:"knows",
            url:'123',
            likes:100,
        }
        await api
            .put(`/api/blogs/${updateBlog.id}`)
            .send(updateBlogInfo)
            .expect(201)
        
        const response=await api.get('/api/blogs')
        const titles=response.body.map(r=>r.title)
        expect(response.body).toHaveLength(initialBlogs.length)
        expect(titles).toContain(updateBlogInfo.title)
    })
})




afterAll(() => {
    mongoose.connection.close()
})