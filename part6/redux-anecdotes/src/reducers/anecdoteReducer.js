import { createSlice } from "@reduxjs/toolkit"
const sortLogic = (a, b) => b.votes - a.votes


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    addAnecdote(state, action){
      const content = action.payload
      console.log(content)
      return state.concat(content)
    },
    voteAnecdote(state, action){
      const id =  action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const updated = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(a => a.id !== id
          ? a
          : updated).sort(sortLogic)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const {addAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
