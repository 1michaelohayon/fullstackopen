import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  Togglable.displayName = 'Togglable'

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>
          {props.closingLabel || 'cancel'}
        </Button>
      </div>
    </>
  )
}

export default Togglable
