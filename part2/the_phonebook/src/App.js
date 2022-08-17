import { useState, useEffect } from 'react'
import personsService from './services/personsService';
import ContactInfo from './componenets/ContactInfo';
import { PersonForm, SearchForm } from './componenets/Forms'


const App = (props) => {
  //States & Effects==============================================
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Searchfilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect');
    personsService
      .getAll()
      .then(personsList => setPersons(personsList));
  }, []);
  console.log('render', persons.length, 'persons');

  //Functions======================================
  const searchLogic =
    !(Searchfilter == "") ?
      persons.filter(p => p.name.toLowerCase().includes(Searchfilter.toLowerCase()))
      :
      persons



  const addPerson = (event) => {
    event.preventDefault()
 
    if (persons.some(p => p.name === newName)) {
      const duplicatePerson = persons.find(p => p.name === newName);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedNumber = { ...duplicatePerson, number: newNumber }
        personsService.update(duplicatePerson.id, updatedNumber)
          .then(updatedPerson => setPersons(persons.map(person => person.id !== duplicatePerson.id ? person : updatedPerson)))
      }
      setNewName("")
      setNewNumber("")
    } else {
      const uniqueId = () => {
        const id = persons.length + 1;
        for (const person in persons) {
          if (person.id === id) {
            id++
            continue
          }
        }
        return id;
      }

      const newPerson = {
        name: newName,
        number: newNumber,
        id: uniqueId
      }

      personsService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })

    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      const changedPersons = persons.filter(p => p.id !== id)

      personsService.deleteRequest(id)
        .then(setPersons(changedPersons));
    }
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
      <SearchForm val={Searchfilter} onChng={filterContent} />
      <h2>add new</h2>
      <PersonForm
        onSub={addPerson}
        name={newName}
        chngName={nameContent}
        number={newNumber}
        chngNumber={numberContent} />
      <h2>Numbers</h2>
      <ul>
        {searchLogic.map(object =>
          <ContactInfo key={object.id} obj={object} click={() => deletePerson(object.id)} />
        )}
      </ul>

    </>
  )
}
export default App