import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYearForm from './components/BirthyearForm'
import LoginForm from './components/LoginForm'
import Recommendad from './components/Recommendad'
import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const user = useQuery(ME)


  if (user.loading) {
    return <div> loading...</div>;
  }

  console.log(user)

  const handleSetToken = async (token) => {
    localStorage.setItem('library-user-token', token)
    setToken(token)
    await client.resetStore()
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("books")
  }

  const loginUI = token
    ? <>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommendad')}>recommend</button>
      <button onClick={logout}>logout</button>
    </>
    : <button onClick={() => setPage('login')}>login</button>



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loginUI}
      </div>


      <LoginForm show={page === 'login'}
        setToken={handleSetToken}
        setPage={setPage} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      {page === 'recommendad' && user.data.me
        ? <Recommendad show={page === 'recommendad'} user={user} />
        : null

      }


      <BirthYearForm show={page === 'authors' && token} />
    </div>
  )
}

export default App
