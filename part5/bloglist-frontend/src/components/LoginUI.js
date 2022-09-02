import { useState } from "react"
import LoginForm from "./LoginForm"
import BlogList from "./BlogList"
import BlogForm
  from "./BlogForm"
const LoginUI = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
  }

  return (
    <div>
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
    </div>
  )


}
export default LoginUI
