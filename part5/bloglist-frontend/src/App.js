import { useState, useRef } from "react"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Notifcation from "./components/Notification"
import blogsService from "./services/blogs"
import Togglable from "./components/Toggleable"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErMsg] = useState(null)
  const [errorModifier, setErMod] = useState(true)
  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      const response = await blogsService
        .create(blogObject)
      setBlogs(blogs.concat(response))
      setErMod(false)
      setErMsg(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => { setErMsg(null) }, 5000)
    } catch (exception) {
      console.log(exception)
      setErMod(true)
      setErMsg(`missing input`)
      setTimeout(() => { setErMsg(null) }, 5000)

    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  return (
    <>
      {user === null
        ? <>
          <h2>log in to application</h2>
          <Notifcation message={errorMessage} error={true} />
          <LoginForm
            setUser={setUser}
            setErMsg={setErMsg} />
        </>
        : <>
          <h2>blogs</h2>
          <Notifcation message={errorMessage} error={errorModifier} />
          <p>{user.name} logged in<button onClick={logout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm  createBlog={createBlog}/>
          </Togglable>
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs} setErMsg={setErMsg} setErMod={setErMod}/>
        </>
      }
    </>
  )

}

export default App
