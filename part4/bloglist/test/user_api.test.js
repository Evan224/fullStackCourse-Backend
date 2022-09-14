const bcrpt=require('bcrypt')
const userModel=require('../models/user')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const mongoose = require('mongoose')

describe("test the REST api ",()=>{
    beforeEach(async()=>{
        await userModel.deleteMany({})
        const passwordHash=await bcrpt.hash('Evanpassword',10)
        const user=new userModel({username:'same',passwordHash})
        await user.save()
    },100000)

    test("test the user creation post",async()=>{
        const usersAtStart=await userModel.find({})
        const newUser={
            username:'Evan',
            name:'Evan',
            password:'Evanpassword'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type',/application\/json/)
        const usersAtEnd=await userModel.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
        const usernames=usersAtEnd.map(u=>u.username)
        expect(usernames).toContain(newUser.username)
    })

    test("test the user creation with already-have username",async()=>{
        const usersAtStart=await userModel.find({})
        const newUser={
            username:'same',
            name:'Evan',
            password:'Evanpassword'
        }
        const sameUser={
            username:'same',
            name:'Evan2',
            password:'Evanpassword2'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)
        
        await api
            .post('/api/users')
            .send(sameUser)
            .expect(400)
        
        const usersAtEnd=await userModel.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })