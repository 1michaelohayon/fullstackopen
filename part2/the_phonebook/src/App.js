import { useState } from 'react'
import Persons from './componenets/Persons'
import { PersonForm } from './componenets/Forms'
import { SearchForm } from './componenets/Forms'


const App = (props) => {
  //States==============================================
  const [persons, setPersons] = useState(props.Phonebook)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')


  //Functions======================================
  const searchLogic =
    !(filter == "") ?
      persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      :
      persons

  const addPerson = (event) => {
    event.preventDefault() //prevents reloading the page to submit html form
    for (let i = 0; i < persons.length - 1; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }


  const nameContent = (event) => {
    setNewName(event.target.value)
  }
  const numberContent = (event) => {
    setNewNumber(event.target.value)
  }
  const filterContent = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  //Return=======================================
  return (
    <>
      <h2>Ponebook</h2>
      <SearchForm val={filter} onChng={filterContent} />
      <h2>add new</h2>
      <PersonForm onSub={addPerson} name={newName} chngName={nameContent}
        number={newNumber} chngNumber={numberContent} />
      <h2>Numbers</h2>
      <Persons data={searchLogic} />

    </>
  )
}
export default App