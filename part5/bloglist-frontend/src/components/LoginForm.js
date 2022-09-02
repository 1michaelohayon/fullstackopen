import { useState, useEffect } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"
import Notifcation from "./Notification"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUnderJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUnderJSON) {
      const user = JSON.parse(loggedUnderJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogIn = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )

      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      console.log(exception.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }

  }


  return (
    <form onSubmit={handleLogIn}>
      <h2>log in to application</h2>
      <Notifcation message={errorMessage} error={true} />
      <div>
        username
        <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>

    </form>
  )

}

export default LoginForm