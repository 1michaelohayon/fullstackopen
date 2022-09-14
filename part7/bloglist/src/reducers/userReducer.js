import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return (state = action.payload)
    },
    clearUser(state, action) {
      return (state = null)
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const assignUser = (user) => {
  return (dispatch) => {
    dispatch(setUser(user))
    blogsService.setToken(user.token)
  }
}
export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogListUser')
    dispatch(clearUser())
  }
}

export const logIn = (loginObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      dispatch(assignUser(user))
    } catch (error) {
      dispatch(setNotification('wrong username or password', 5000, true))
    }
  }
}

export default userSlice.reducer
