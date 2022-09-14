import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { useField } from '../hooks'

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
          <input id="Title" {...title} />
        </div>
        <div>
          author
          <input id="Author" {...author} />
        </div>
        <div>
          url
          <input id="Url" {...url} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm
