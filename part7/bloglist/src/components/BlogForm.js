import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { useField } from '../hooks'
import { Button, TextField } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const clearFields = () => {
    if (title.value !== '' && author.value !== '' && url.value !== '') {
      title.onChange('', true)
      author.onChange('', true)
      url.onChange('', true)
    }
  }

  const creteBlog = (event) => {
    event.preventDefault()
    dispatch(
      addBlog({ title: title.value, author: author.value, url: url.value })
    )
    clearFields()
  }

  return (
    <div>
      <form onSubmit={creteBlog}>
        <div>
          title
          <TextField variant="outlined" id="Title" {...title} />
        </div>
        <div>
          author
          <TextField variant="outlined" id="Author" {...author} />
        </div>
        <div>
          url
          <TextField variant="outlined" id="Url" {...url} />
        </div>
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
