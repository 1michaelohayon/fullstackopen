import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { Button, TextField, Paper } from '@mui/material'
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
        <TextField id="Username" {...username} />
      </div>
      <div>
        password
        <TextField id="Password" {...password} />
      </div>
      <Button variant="contained" id="login-button" type="submit">
        login
      </Button>
    </form>
  )
}

export default LoginForm
