const usersRouter=require('express').Router()
const userModel=require('../models/user')
const bcrypt=require('bcrypt')

usersRouter.get('/',async (request,response) => {
        const users=await userModel.find({})
        response.status(200).json(users)
})

usersRouter.post('/',async (request,response) => {
    const body=request.body
    const exisenceUser=await userModel.findOne({username:body.username});
    // await console.log(body,'12312321321312')
    if(exisenceUser){
        return response.status(400).json({error:'there is already a user'})
    }
    if(!body.password || body.password.length<3){
        return response.status(400).json({error:'password must be at least 3 characters long'})
    }
    if(!body.username||body.username.length<3){
        return response.status(400).json({error:'username must be at least 3 characters long'})
    }
    const saltRounds=10
    const passwordHash=await bcrypt.hash(body.password,saltRounds)
    const user=new userModel({
        username:body.username,
        name:body.name,
        passwordHash
    })
    const savedUser=await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter

