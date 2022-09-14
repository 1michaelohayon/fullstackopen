import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  const handleLogIn = async (event) => {
    event.preventDefault()
    dispatch(logIn({ username: username.value, password: password.value }))
  }

  return (
    <form onSubmit={handleLogIn}>
      <div>
        username
        <input id="Username" {...username} />
      </div>
      <div>
        password
        <input id="Password" {...password} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
