const bcrpt=require('bcrypt')
const User=require('../models/userModel')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const mongoose = require('mongoose')

describe("test the REST api ",()=>{
    beforeEach(async()=>{
        await User.deleteMany({})
        const passwordHash=await bcrpt.hash('Evanpassword',10)
        const user=new User({username:'same',passwordHash})
        await user.save()
    },100000)

    test("test the user creation post",async()=>{
        const usersAtStart=await User.find({})
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
        const usersAtEnd=await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
        const usernames=usersAtEnd.map(u=>u.username)
        expect(usernames).toContain(newUser.username)
    })

    test("test the user creation with already-have username",async()=>{
        const usersAtStart=await User.find({})
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
        const res1=await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(res1.body.error).toContain('there is already a user')
        
        await api
            .post('/api/users')
            .send(sameUser)
            .expect(400)
        
        const usersAtEnd=await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test("test the username and password length",async()=>{
        const usersAtStart=await User.find({})

            const newUser={
                username:'Evasd',
                name:'Evan',
                password:'Ev'
            }
            const result=await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error)
        .toEqual('password must be at least 3 characters long')
        const usersAtEnd=await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        const newUser2={
            username:'Ev',
            name:'Evan',
            password:'Evanpassword'
        }
        
        const res2=await api
            .post('/api/users')
            .send(newUser2)
            .expect(400)
        expect(res2.body.error).toEqual("username must be at least 3 characters long")
        
    })


})

afterAll(() => {
    mongoose.connection.close()
  })