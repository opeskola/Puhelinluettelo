const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}



const password = process.argv[2]
const arg_name = process.argv[3]
const arg_number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-enjmy.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    //id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// if one parameter is given, the database content are printed to console
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
// else if three parameters are given, the name and number are saved to database
else if (process.argv.length === 5) {
  const person = new Person({
    //id: Math.floor(100000 * Math.random()),
    name: arg_name,
    number: arg_number,
  })
  
  person.save().then(response => {
    console.log('added', arg_name, 'number', arg_number, 'to phonebook');
    mongoose.connection.close();
  })
}

else {
  console.log('amount of parameters not valid');
  mongoose.connection.close();
}











  