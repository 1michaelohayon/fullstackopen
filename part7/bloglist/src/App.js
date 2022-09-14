import LoginForm from './components/LoginForm'
import BlogList, { BlogView } from './components/BlogList'
import Notifcation from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { logout, assignUser } from './reducers/userReducer'
import { useEffect, useState } from 'react'
import Users from './components/Users'
import IndividualUser from './components/IndividualUser'
import { useResource } from './hooks'
import { Container, AppBar, Button, Toolbar, Box } from '@mui/material'

import {
  Routes,
  Route,
  Navigate,
  useMatch,
  Link,
  useNavigate,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [users, usersService] = useResource('/api/users')

  useEffect(() => {
    const loggedUnderJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUnderJSON) {
      const user = JSON.parse(loggedUnderJSON)
      dispatch(assignUser(user))
    }
  }, [dispatch])

  const match = useMatch('/users/:id')
  const findUser = match ? users.find((u) => u.id === match.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const findBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  const NavigationBar = ({ user }) => {
    const logoutHandle = () => {
      dispatch(logout())
      navigate('/login')
    }
    if (user) {
      return (
        <div>
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <MenuButtons />
              <Box
                sx={{ display: { xs: 'none', sm: 'block' }, position: 'right' }}
              >
                <em>
                  {user.name} logged in <span />
                </em>
                <Button color="inherit" onClick={logoutHandle}>
                  logout
                </Button>
              </Box>
              <Box
                sx={{ display: { xs: 'block', sm: 'none' }, position: 'right' }}
              >
                <Button color="inherit" onClick={logoutHandle}>
                  logout
                </Button>
              </Box>
            </Toolbar>
            <Notifcation />
          </AppBar>
          <h2>blogs</h2>
        </div>
      )
    }
  }

  return (
    <>
      <Container>
        <NavigationBar user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <BlogList /> : <Navigate replaces to="/login" />}
          />
          <Route path="/users" element={<Users />} />
          <Route
            path="/users/:id"
            element={<IndividualUser user={findUser} />}
          />
          <Route path="/blogs/:id" element={<BlogView blog={findBlog} />} />
          <Route
            path="/login"
            element={user ? <Navigate replaces to="/" /> : <LoginPage />}
          />
        </Routes>
      </Container>
    </>
  )
}

export default App

const LoginPage = () => (
  <div>
    <h2>log in to application</h2>
    <Notifcation />
    <LoginForm />
  </div>
)

const MenuButtons = () => (
  <Box>
    <Button color="inherit" component={Link} to="/">
      blogs
    </Button>
    <Button color="inherit" component={Link} to="/users">
      users
    </Button>
  </Box>
)
