import { useState } from "react"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  return (
    <>
      {user === null
        ? <LoginForm setUser={setUser} />
        : <div>
          <h2>blogs</h2>
          <p>{user.name} logged in<button onClick={logout}>logout</button></p>
          <h2>create new</h2>
          <BlogForm blogs={blogs} setBlogs={setBlogs} />
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </div>
      }
    </>
  )

}

export default App
