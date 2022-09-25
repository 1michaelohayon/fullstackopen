import { useState } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, show, setPage, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })

  if (!show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()

    const reuslt = await login({ variables: { username, password } })
    const token = reuslt.data.login.value
    localStorage.setItem('library-user-token', token)
    setToken(token)
    setPage('authors')


  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )


}

export default LoginForm