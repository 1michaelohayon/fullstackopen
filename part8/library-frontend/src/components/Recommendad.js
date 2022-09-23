import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommendad = (props) => {

  const filter = props.user.data.me.favouriteGenre
  const result = useQuery(ALL_BOOKS, { variables: { genre: filter } })

  if (result.loading) {
    return <div> loading...</div>;
  }

  const books = result.data.allBooks
  if (books.length === 0) {
    return <div>
      <h2>recommendations</h2>
      <div>No books with "{filter}" genre found</div>
    </div>
  }
  return (
    <div>
      <h2>recommendations</h2>

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

    </div>
  )
}

export default Recommendad




