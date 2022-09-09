const express=require('express');
const cors=require('cors');
const app=express();
const morgan=require('morgan');

app.use(express.static('build'))
// app.use(morgan('tiny'));
app.use(cors());
morgan.token('body',(res,req)=>{
    return JSON.stringify(res.body);
})
app.use(morgan(':method :url :status :total-time - :response-time ms :body'))

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(express.json())
 
app.get('/api/persons',(request,response)=>{
    response.json(persons)
})
app.get('/info',(request,response)=>{
    response.send(`<p>Phonebook has info for ${persons.length} 
    people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    const selectedPerson=persons.find(p=>p.id===id);
    if(!selectedPerson){
        response.status(404).end()
    }else{
        response.json(selectedPerson)
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    persons=persons.filter(p=>p.id!==id)
    response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
    const body = request.body
    // console.log(body);
    // console.log(request);
    if(!body){
        return response.status(400).json({
            error:'content missing'
        })
    }
    const{name,number}=body;
    if(!name || !number){
        return response.status(400).json({
            error:'No name or number!'
        })
    }
    if(persons.find(p=>p.name===name)){
        return response.status(400).json({
            error:'Already has a name!'
        })
    }
    const newPerson={
        id:Math.floor(Math.random()*1000),
        name,
        number
    }
    persons=persons.concat(newPerson);
    return response.json(newPerson);
})

app.put('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    const body=request.body
    const person=persons.find(p=>p.id===id)
    const newPerson={...person,number:body.number}
    persons=persons.map(p=>p.id!==id?p:newPerson)
    response.json(newPerson)
}
)

const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})