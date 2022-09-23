import { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { useMutation, useQuery } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [createBook] = useMutation(CREATE_BOOK, {

    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {

        const updatedAuthor = response.data.addBook.author

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
