import { useState } from "react"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Notifcation from "./components/Notification"

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErMsg] = useState(null)
  const [errorModifier, setErrMod] = useState(true)

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
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setErMsg={setErMsg}
            setErMod={setErrMod} />
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs} />
        </>
      }
    </>
  )

}

export default App
