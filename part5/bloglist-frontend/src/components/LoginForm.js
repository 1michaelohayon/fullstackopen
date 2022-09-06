import { useState, useEffect } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"

const LoginForm = ({ setUser, setErMsg }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setErMsg('wrong username or password')
      console.log(exception.message)
      setTimeout(() => { setErMsg(null) }, 5000)
    }

  }


  return (
    <form onSubmit={handleLogIn}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>

    </form>
  )

}

export default LoginForm