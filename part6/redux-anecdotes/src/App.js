
import { useEffect } from 'react'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'



const App = () => {
const dispatch = useDispatch()
useEffect(() => {
  anecdotesService
    .getAll().then(anecdots => dispatch(setAnecdotes(anecdots)))
}, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App