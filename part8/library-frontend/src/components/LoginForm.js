import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN, ME } from "../queries";

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    const savedToken = window.localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
      setPage('authors')
    }
  }, [])

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('library-user-token', token)
      setToken(token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
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