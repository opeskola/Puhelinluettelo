const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const arg_name = process.argv[3]
const arg_number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-enjmy.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    id: Math.floor(100000 * Math.random()),
    name: arg_name,
    number: arg_number,
})

person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
  })