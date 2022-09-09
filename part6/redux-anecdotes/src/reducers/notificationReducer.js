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
export default notificationSlice.reducer

