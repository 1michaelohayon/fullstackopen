import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries"
import Select from 'react-select';


const BirthYearForm = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS)
  const [changedYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [selectedOption, setSelectedOption] = useState(null);
  const [setBornTo, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (authorsQuery.loading) {
    return <div> loading...</div>;
  }

  const options = []

  authorsQuery
    .data
    .allAuthors
    .forEach(a => {
      options.push({ label: a.name, value: a.name })
    })



  const updateAuthor = (event) => {
    event.preventDefault()
    const name = selectedOption.value
    changedYear({ variables: { name, setBornTo } })

    setBorn('')
  }




  return (
    <div>
      <form onSubmit={updateAuthor}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />

        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )

}
export default BirthYearForm