import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notification(state, action) {
      const message = action.payload
      const error = false
      return (state = { error, message })
    },
    errorNotification(state, action) {
      return (state = { error: true, message: action.payload })
    },
    resetNotification(state, action) {
      return (state = null)
    },
  },
})

export const { notification, resetNotification, errorNotification } =
  notificationSlice.actions

export const setNotification = (message, time, error) => {
  return async (dispatch) => {
    error
      ? dispatch(errorNotification(message))
      : dispatch(notification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time)
  }
}

export default notificationSlice.reducer
