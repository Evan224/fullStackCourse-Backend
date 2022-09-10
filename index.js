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




 
app.get('/api/persons',(request,response,next)=>{
    PersonModel.find({}).then(persons=>{
        response.json(persons);
    }).catch(error=>{
        next(error);
    })
})
app.get('/info',(request,response,next)=>{
    PersonModel.find({}).then(persons=>{
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
    }).catch(error=>{
        next(error);
    })
})

app.get('/api/persons/:id',(request,response,next)=>{
    const id=request.params.id;
    // const id="631b96ea2bd5f84a7f8fb238"
    PersonModel.findById(id).then(person=>{
        if(person){
            response.json(person);
        }else{
            response.status(404).end();
        }
    }).catch(error=>{
        next(error);
    })
})

app.delete('/api/persons/:id',(request,response,next)=>{
    const id=request.params.id;
    PersonModel.findByIdAndRemove(id).then(result=>{
        response.status(204).end();
    }).catch(error=>{
        next(error);
    })
})

app.post('/api/persons',async (request,response,next)=>{
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
    // if(!name || !number){
    //     return response.status(400).json({
    //         error:'No name or number!'
    //     })
    // }
    // const test=await PersonModel.find({}).where('name').equals(name);
    // console.log(test,"test-----------");
    // if(test.length>0){
    //     return response.status(400).json({
    //         error:'Already has a name!'
    //     })
    // }
    const newPerson={
        name,
        number
    }

    PersonModel.create(newPerson).then(person=>{
        response.json(person);
    }).catch(error=>{
        console.log('passon')
        next(error);
    })
})

app.put('/api/persons/:id',(request,response,next)=>{
    const id=request.params.id
    const body=request.body;
    const {name,number}=body;
    PersonModel.findByIdAndUpdate(id,{number},{new:true,runValidators:true,context:"query"}).then(updatedPerson=>{
        console.log(updatedPerson);
        response.json(updatedPerson);
    }).catch(error=>{
        next(error);
    })
})

const errorHandler=(error,request,response,next)=>{
    console.log(error.message);
    if(error.name==='CastError'){
        return response.status(400).send({error:'malformatted id'})
    }else if(error.name==='ValidationError'){
        return response.status(400).json({error:error.message})
    }
    next(error);
}
app.use(errorHandler);

const unknownEndpoint=(request,response)=>{
    response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint);


const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})