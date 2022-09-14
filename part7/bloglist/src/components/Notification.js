import { useSelector } from 'react-redux'
const style = {
  color: 'green',
  background: 'lightGrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const errorStyle = {
  color: 'red',
  background: 'lightGrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}
const Notifcation = () => {
  const notification = useSelector((state) => {
    if (state.notification) {
      const message = state.notification.message
      const error = state.notification.error

      return (
        <div style={error ? errorStyle : style} className="error">
          {message}
        </div>
      )
    }
  })

  return <div>{notification}</div>
}

export default Notifcation
