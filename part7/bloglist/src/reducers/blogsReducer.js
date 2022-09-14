import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'
import commentService from '../services/comments'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
      return state
    },
    updateRemoved(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    setUpdate(state, action) {
      const updated = action.payload
      return state
        .map((b) => (b.id !== updated.id ? b : updated))
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { setBlogs, appendBlog, updateRemoved, setUpdate, appendComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const liked = { ...blog, likes: blog.likes + 1 }
      await blogsService.update(liked)
      dispatch(setUpdate(liked))
    } catch (error) {
      dispatch(setNotification(`${blog.title} was already deleted`, 5000, true))
      dispatch(updateRemoved(blog.id))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.remove(blog)
    dispatch(updateRemoved(blog.id))
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogsService.create(blogObject)
      dispatch(appendBlog(addedBlog))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5000
        )
      )
    } catch (error) {
      console.log(error.response.statusText)
      if (error === 'something') {
        return dispatch(setNotification(`session timed out`, 5000, true))
      }
      dispatch(setNotification(`missing input`, 5000, true))
    }
  }
}

export const addComment = (blog, commentObject) => {
  return async (dispatch) => {
    const comment = await commentService.create(commentObject)
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    }

    dispatch(setUpdate(updatedBlog))
  }
}
export default blogSlice.reducer
