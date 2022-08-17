import { useState, useEffect } from 'react'
import personsService from './services/personsService';
import ContactInfo from './componenets/ContactInfo';
import { PersonForm, SearchForm } from './componenets/Forms'
import Notification from './componenets/Notifcation'


const App = (props) => {
  //States & Effects==============================================
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Searchfilter, setNewFilter] = useState('')
  const [notifcationMessage, setnotifcationMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

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


  const changeNumberPrompt = () => {
    const duplicatePerson = persons.find(p => p.name === newName);
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedNumber = { ...duplicatePerson, number: newNumber }
      personsService.update(duplicatePerson.id, updatedNumber)
        .then(updatedPerson => setPersons(persons.map(person => person.id !== duplicatePerson.id ? person : updatedPerson)))
        .catch(error => {
          setErrorMsg(`Information of ${newName} has already been deleted from the server`)
          const changedPersons = persons.filter(p => p.name !== newName)
          setPersons(changedPersons);
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        })
    }
    setNewName("")
    setNewNumber("")
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      changeNumberPrompt();
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
          setnotifcationMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setnotifcationMessage(null);
          }, 5000);
        })

    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      const changedPersons = persons.filter(p => p.id !== id)

      personsService.deleteRequest(id)
        .then(setPersons(changedPersons))
        .catch(error => {
          alert(`${person.name} was already deleted from the server.`)
          console.log(`${person.name} doesn't exist on the server.`)
        })
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
      <Notification message={errorMsg} error={true}/>
      <Notification message={notifcationMessage} error={false}/>
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