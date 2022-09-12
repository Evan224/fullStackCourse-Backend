const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
console.log(process.argv)

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://EvanTest2:${password}@cluster0.w2a2mmr.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

const connectAdd = async () => {
    await mongoose.connect(url, {})
    const person = new Person({
        name: name,
        number: number
    })
    await person.save()
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
}

const connectGetAll = async () => {
    await mongoose.connect(url, {})
    const persons = await Person.find({})
    console.log('phonebook:')
    persons.forEach(person => {
        if(person.name){
            console.log(person.name, person.number)
        }
    })
    mongoose.connection.close()
}

// console.log(name,number);
if (name && number) {
    connectAdd()
}else if(name){

}else if(number){

}else{
    connectGetAll()
}