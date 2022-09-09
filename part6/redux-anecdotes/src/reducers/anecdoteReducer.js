import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const sortLogic = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVotes(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id
        ? a
        : updated).sort(sortLogic)
    },
    setAnecdotes(state, action) {
      return action.payload.sort(sortLogic)
    }
  }

})



export const { appendAnecdote, updateVotes, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const  updated = await anecdotesService.update(updatedAnecdote)
    dispatch(updateVotes(updated))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
