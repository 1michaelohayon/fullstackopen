import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {

    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(input))
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