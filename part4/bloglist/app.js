const config=require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/loginRouter')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
    info('connected to MongoDB')
}).catch(errorMes => {
    error('cannot connect to MongoDB', errorMes.message)
})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app