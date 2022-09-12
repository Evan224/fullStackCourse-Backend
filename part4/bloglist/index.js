const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
// console.log(process.env)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
console.log('connecting to', mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    console.log('get request')
    Blog
        .find({})
        .then(blogs => {
            // mongoose.connection.close()

            response.json(blogs)

        }).catch(error => {
            console.log(error)
            // mongoose.connection.close()

            response.json(error)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            // mongoose.connection.close()
            response.status(201).json(result)
        }).catch(error => {
            console.log(error)
            // mongoose.connection.close()

            response.json(error)
        })
})


const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})