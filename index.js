require('dotenv').config()
const express=require('express');
const cors=require('cors');
const app=express();
const morgan=require('morgan');
const PersonModel=require('./models/person');
const person = require('./models/person');

app.use(express.static('build'))
// app.use(morgan('tiny'));
app.use(cors());
morgan.token('body',(res,req)=>{
    return JSON.stringify(res.body);
})
app.use(morgan(':method :url :status :total-time - :response-time ms :body'))

// let persons=[
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
app.use(express.json())
 
app.get('/api/persons',(request,response)=>{
    PersonModel.find({}).then(persons=>{
        response.json(persons);
    }).catch(error=>{
        console.log(error);
    })
})
app.get('/info',(request,response)=>{
    PersonModel.find({}).then(persons=>{
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
    }).catch(error=>{
        console.log(error);
    })
})

app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id;
    // const id="631b96ea2bd5f84a7f8fb238"
    PersonModel.findById(id).then(person=>{
        if(person){
            response.json(person);
        }else{
            response.status(404).end();
        }
    }).catch(error=>{
        console.log(error);
        response.status(400).send(error);
    })
})

app.delete('/api/persons/:id',(request,response)=>{
    const id=request.params.id;
    PersonModel.findByIdAndRemove(id).then(result=>{
        response.status(204).end();
    }).catch(error=>{
        console.log(error);
        response.status(400).send(error);
    })
})

app.post('/api/persons',async (request,response)=>{
    const body = request.body
    // console.log(body);
    // console.log(request);
    if(!body){
        return response.status(400).json({
            error:'content missing'
        })
    }
    const{name,number}=body;
    console.log(
        name,number 
    )
    if(!name || !number){
        return response.status(400).json({
            error:'No name or number!'
        })
    }
    const test=await PersonModel.find({}).where('name').equals(name);
    console.log(test,"test-----------");
    if(test.length>0){
        return response.status(400).json({
            error:'Already has a name!'
        })
    }
    const newPerson={
        name,
        number
    }

    PersonModel.create(newPerson).then(person=>{
        response.json(person);
    }).catch(error=>{
        console.log(error);
        response.status(400).send(error);
    })
})

app.put('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const body=request.body;
    const {name,number}=body;
    PersonModel.findByIdAndUpdate(id,{number},{new:true}).then(updatedPerson=>{
        console.log(updatedPerson);
        response.json(updatedPerson);
    }).catch(error=>{
        console.log(error,'error');
        response.status(400).send(error);
    })
})

const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})