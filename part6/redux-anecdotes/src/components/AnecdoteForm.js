import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {

    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdotesService.createNew(input)
    dispatch(addAnecdote(newAnecdote))
  }


  return (<div>
    <h2>create new</h2>
    <form onSubmit={createAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  </div>
  )
}




export default AnecdoteForm