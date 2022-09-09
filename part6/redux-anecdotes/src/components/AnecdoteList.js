import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const voteFor = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(anecdote.content, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
  if (state.filter !== "") {
    return {
      anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  }
  return {
    anecdotes: state.anecdotes
  }

}


const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)

export default connectedAnecdotes