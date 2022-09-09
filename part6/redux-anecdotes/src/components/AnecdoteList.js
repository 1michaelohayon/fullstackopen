import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(
    state => !(state.filter === "")
      ? state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      : state.anecdotes)



  const voteFor = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(anecdote.content, 5))
  }



  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList