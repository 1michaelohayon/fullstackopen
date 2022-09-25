import { useState } from 'react'
import { ALL_AUTHORS, CREATE_BOOK, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message || "bad input")
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const addedBook = response.data.addBook
        const updatedAuthor = addedBook.author
        updateCache(cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)

        return {
          allAuthors: allAuthors.some(a => a.name === updatedAuthor.name)
            ? allAuthors.map(a => a.name === updatedAuthor.name ? updatedAuthor : a)
            : allAuthors.concat(updatedAuthor)
        }
      })
    },

  })


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
