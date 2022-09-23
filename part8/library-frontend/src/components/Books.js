import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"


const BooksContent = props => {
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS, { variables: { genre: filter } })

  if (result.loading) {
    return <div> loading...</div>;
  }

  const books = result.data.allBooks

  const genres = []
  books
    .map(b => b.genres)
    .forEach(a => a
      .forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
    )



  const genersButtons = genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)



  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
      {genersButtons}
      <button onClick={() => setFilter(null)}>all genres</button>

    </div>
  )
}

const Books = (props) => {


  if (!props.show) {
    return null
  }


  return <BooksContent />
}

export default Books