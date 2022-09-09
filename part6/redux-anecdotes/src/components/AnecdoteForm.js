import { addAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const createAnecdote = async (event) => {

    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.addAnecdote(input)
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

const mapDispatchToProps = dispatch => {
  return {
    addAnecdote: value => {
      dispatch(addAnecdote(value))
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)