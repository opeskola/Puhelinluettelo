const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "045-1236543",
    },
    {
        id: 2,
        name: "Arto Järvinen",
        number: "041-21423123",
    },
    {
        id: 3,
        name: "Lea Kutvonen",
        number: "040-4323234",
    },
    {
        id: 4,
        name: "Martti Tienari",
        number: "09-784232",
    }
]

// morgan logging
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

// routes start here
app.get('/info', (req, res) => {
  res.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>
            <p>${new Date(new Date().toUTCString())}</p>`)
  res.send(`test`)
})
  
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

app.post('/api/persons', (request, response) => {
  console.log(request.body)
  const newId = Math.floor(100000 * Math.random())
  const person = request.body
  const duplicatePersons = persons.find(p => p.name === person.name)

  if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  if (duplicatePersons) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  person.id = newId
  persons = persons.concat(person)

  response.json(person)
})

// create message for user if unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})