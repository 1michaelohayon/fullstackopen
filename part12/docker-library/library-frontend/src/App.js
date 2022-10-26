import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYearForm from './components/BirthyearForm'
import LoginForm from './components/LoginForm'
import Recommendad from './components/Recommendad'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {

  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {

    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const user = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)

    },
  })

  if (user.loading) {
    return <div> loading...</div>;
  }


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


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
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loginUI}
      </div>


      <LoginForm show={page === 'login'}
        setToken={handleSetToken}
        setPage={setPage}
        notify={notify} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} notify={notify} />

      {page === 'recommendad' && user.data.me
        ? <Recommendad show={page === 'recommendad'} user={user} />
        : null

      }


      <BirthYearForm show={page === 'authors' && token} />
    </div>
  )
}

export default App



const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}