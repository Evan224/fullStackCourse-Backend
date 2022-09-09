const express=require('express');
const app=express();

const persons=[
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

// 
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
    const {body}=request;
    const{name,number}=body;
    const newPerson={
        id:Math.floor(Math.random()*1000),
        name,
        number
    }
    persons=persons.concat(newPerson);
    return response.json(newPerson);
})

const PORT=3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})