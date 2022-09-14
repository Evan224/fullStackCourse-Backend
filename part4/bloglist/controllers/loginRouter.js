const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

const getTokenFrom=(request)=>{
    const authorization=request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

loginRouter.post('/', async (request, response) => {
    const body = request.body
    
    const user = await User.findOne({ username: body.username })
    console.log(body.username,'12312321')
    console.log(user);
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    console.log(passwordCorrect,'12321312',user)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
        error: 'invalid username or password'
        })
    }
    
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)
    
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter