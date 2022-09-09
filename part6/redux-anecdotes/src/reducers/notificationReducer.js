import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    voteNotification(state = initialState, action) {
      const content = action.payload
      return state = `you voted '${content}'`
    },
    resetNotification(state, action) {
 
      return state = initialState

    }
  }
})

export const { voteNotification, resetNotification } = notificationSlice.actions

let timeoutID
export const setNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    const timeInMS = time * 1000
    dispatch(voteNotification(content))

    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, timeInMS)

  } 
}

export default notificationSlice.reducer

