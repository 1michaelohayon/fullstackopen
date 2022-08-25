const mongoose = require('mongoose')

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  console.log('or to add person: node mongo.js <password> <name> <number>')

  process.exit(1)
}


const password = process.argv[2]
const url = `mongodb+srv://1michael:${password}@cluster0.mapxzja.mongodb.net/phonebook?retryWrites=true&w=majority`
const name = process.argv[3]
const phoneNumber = process.argv[4]


const phonebookSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})
const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 5) {

  mongoose.connect(url).then((result) => {

    const person = new Person({
      name: name,
      number: phoneNumber,
    })
    return person.save()
  }).then(() => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`)
    return mongoose.connection.close()
  }).catch((err) => console.log(err))
} else if (process.argv.length === 3) {
  mongoose.connect(url).then((result) => {
    console.log('phonebook:')
    Person.find({}).then(result => {
      result.forEach(p => {
        console.log(p.name, p.number)
      })
      mongoose.connection.close()
    })
  }).catch((err) => console.log(err))
}