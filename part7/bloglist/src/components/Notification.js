import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notifcation = () => {
  const notification = useSelector((state) => {
    if (state.notification) {
      const message = state.notification.message
      const error = state.notification.error

      return (
        <Alert severity={error ? 'error' : 'success'} className="error">
          {message}
        </Alert>
      )
    }
  })

  return <div>{notification}</div>
}

export default Notifcation
